/**
 * SEÑAS CONNECT - Detector de Manos
 *
 * Módulo que maneja la detección de manos usando MediaPipe Hands.
 * Procesa el video de la cámara y extrae los landmarks (puntos) de las manos.
 */

class HandDetector {
    constructor() {
        this.hands = null;
        this.camera = null;
        this.videoElement = null;
        this.canvasElement = null;
        this.canvasCtx = null;
        this.isRunning = false;
        this.onResultsCallback = null;
        this.lastFrameTime = 0;
        this.fps = 0;

        // Estado de detección
        this.handsDetected = false;
        this.currentHandData = null;

        this.init();
    }

    /**
     * Inicializa MediaPipe Hands
     */
    async init() {
        try {
            this.log('Inicializando MediaPipe Hands...');

            // Crear instancia de Hands
            this.hands = new Hands({
                locateFile: (file) => {
                    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/${file}`;
                },
            });

            // Configurar opciones
            this.hands.setOptions({
                maxNumHands: CONFIG.mediapipe.maxNumHands,
                modelComplexity: CONFIG.mediapipe.modelComplexity,
                minDetectionConfidence: CONFIG.mediapipe.minDetectionConfidence,
                minTrackingConfidence: CONFIG.mediapipe.minTrackingConfidence,
            });

            // Configurar callback de resultados
            this.hands.onResults((results) => this.onResults(results));

            this.log('MediaPipe Hands inicializado correctamente');
            return true;
        } catch (error) {
            console.error('[HandDetector] Error inicializando:', error);
            return false;
        }
    }

    /**
     * Configura los elementos de video y canvas
     */
    setElements(videoElement, canvasElement) {
        this.videoElement = videoElement;
        this.canvasElement = canvasElement;
        this.canvasCtx = canvasElement.getContext('2d');
    }

    /**
     * Registra callback para recibir resultados
     */
    onResultsReceived(callback) {
        this.onResultsCallback = callback;
    }

    /**
     * Inicia la cámara y la detección
     */
    async start(deviceId = null) {
        if (this.isRunning) {
            this.log('Ya está ejecutándose');
            return true;
        }

        try {
            this.log('Iniciando cámara...');

            // Configuración de la cámara - optimizada para mejor encuadre
            const constraints = {
                video: {
                    width: CONFIG.camera.width,
                    height: CONFIG.camera.height,
                    frameRate: CONFIG.camera.frameRate,
                    // Evitar zoom automático
                    resizeMode: 'none',
                },
            };

            // Si hay un deviceId específico, usarlo
            if (deviceId) {
                constraints.video.deviceId = { exact: deviceId };
            } else {
                constraints.video.facingMode = CONFIG.camera.facingMode;
            }

            // Intentar deshabilitar zoom si la cámara lo soporta
            if (CONFIG.camera.advanced) {
                constraints.video.advanced = CONFIG.camera.advanced;
            }

            // Obtener stream de video
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.videoElement.srcObject = stream;

            // Intentar resetear zoom a 1x si la cámara lo soporta
            try {
                const track = stream.getVideoTracks()[0];
                const capabilities = track.getCapabilities();
                if (capabilities.zoom) {
                    await track.applyConstraints({
                        advanced: [{ zoom: capabilities.zoom.min }],
                    });
                    this.log('Zoom de cámara reseteado a mínimo');
                }
            } catch (zoomError) {
                this.log('No se pudo ajustar zoom: ' + zoomError.message);
            }

            // Esperar a que el video esté listo
            await new Promise((resolve) => {
                this.videoElement.onloadedmetadata = () => {
                    this.videoElement.play();
                    resolve();
                };
            });

            // Ajustar tamaño del canvas
            this.canvasElement.width = this.videoElement.videoWidth;
            this.canvasElement.height = this.videoElement.videoHeight;

            // Iniciar la cámara de MediaPipe
            this.camera = new Camera(this.videoElement, {
                onFrame: async () => {
                    if (this.hands && this.isRunning) {
                        await this.hands.send({ image: this.videoElement });
                    }
                },
                width: this.videoElement.videoWidth,
                height: this.videoElement.videoHeight,
            });

            await this.camera.start();
            this.isRunning = true;

            this.log('Cámara iniciada correctamente');
            return true;
        } catch (error) {
            console.error('[HandDetector] Error iniciando cámara:', error);
            throw error;
        }
    }

    /**
     * Detiene la cámara y la detección
     */
    stop() {
        if (!this.isRunning) return;

        this.log('Deteniendo...');

        if (this.camera) {
            this.camera.stop();
        }

        // Detener todas las pistas del stream
        if (this.videoElement && this.videoElement.srcObject) {
            const tracks = this.videoElement.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
            this.videoElement.srcObject = null;
        }

        // Limpiar canvas
        if (this.canvasCtx) {
            this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        }

        this.isRunning = false;
        this.handsDetected = false;
        this.currentHandData = null;

        this.log('Detenido');
    }

    /**
     * Procesa los resultados de MediaPipe
     */
    onResults(results) {
        // Calcular FPS
        const now = performance.now();
        this.fps = Math.round(1000 / (now - this.lastFrameTime));
        this.lastFrameTime = now;

        // Limpiar canvas
        this.canvasCtx.save();
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

        // Verificar si hay manos detectadas
        this.handsDetected = results.multiHandLandmarks && results.multiHandLandmarks.length > 0;

        if (this.handsDetected) {
            // Procesar cada mano detectada
            const handDataArray = [];

            for (let i = 0; i < results.multiHandLandmarks.length; i++) {
                const landmarks = results.multiHandLandmarks[i];
                const handedness = results.multiHandedness[i];

                // Dibujar landmarks si está habilitado
                if (CONFIG.debug.showLandmarks) {
                    this.drawHand(landmarks);
                }

                // Extraer datos de la mano
                const handData = this.extractHandData(landmarks, handedness);
                handDataArray.push(handData);
            }

            this.currentHandData = handDataArray;

            // Llamar callback con los datos
            if (this.onResultsCallback) {
                this.onResultsCallback({
                    handsDetected: true,
                    hands: handDataArray,
                    fps: this.fps,
                });
            }
        } else {
            this.currentHandData = null;

            if (this.onResultsCallback) {
                this.onResultsCallback({
                    handsDetected: false,
                    hands: [],
                    fps: this.fps,
                });
            }
        }

        // Mostrar FPS si está habilitado
        if (CONFIG.debug.showFPS) {
            this.drawFPS();
        }

        this.canvasCtx.restore();
    }

    /**
     * Dibuja los landmarks de una mano en el canvas
     */
    drawHand(landmarks) {
        const isHighContrast = document.body.classList.contains('high-contrast');

        // Dibujar conexiones
        if (CONFIG.debug.showConnections) {
            const connectionColor = isHighContrast
                ? CONFIG.drawing.connectionColorHighContrast
                : CONFIG.drawing.connectionColor;

            drawConnectors(this.canvasCtx, landmarks, HAND_CONNECTIONS, {
                color: connectionColor,
                lineWidth: CONFIG.drawing.lineWidth,
            });
        }

        // Dibujar puntos
        const landmarkColor = isHighContrast
            ? CONFIG.drawing.landmarkColorHighContrast
            : CONFIG.drawing.landmarkColor;

        drawLandmarks(this.canvasCtx, landmarks, {
            color: landmarkColor,
            lineWidth: 1,
            radius: CONFIG.drawing.pointRadius,
        });
    }

    /**
     * Dibuja el FPS en el canvas
     */
    drawFPS() {
        this.canvasCtx.font = '16px Arial';
        this.canvasCtx.fillStyle = '#00FF00';
        this.canvasCtx.fillText(`FPS: ${this.fps}`, 10, 20);
    }

    /**
     * Extrae datos estructurados de los landmarks de una mano
     */
    extractHandData(landmarks, handedness) {
        // Índices de landmarks importantes
        const WRIST = 0;
        const THUMB_CMC = 1;
        const THUMB_MCP = 2;
        const THUMB_IP = 3;
        const THUMB_TIP = 4;
        const INDEX_MCP = 5;
        const INDEX_PIP = 6;
        const INDEX_DIP = 7;
        const INDEX_TIP = 8;
        const MIDDLE_MCP = 9;
        const MIDDLE_PIP = 10;
        const MIDDLE_DIP = 11;
        const MIDDLE_TIP = 12;
        const RING_MCP = 13;
        const RING_PIP = 14;
        const RING_DIP = 15;
        const RING_TIP = 16;
        const PINKY_MCP = 17;
        const PINKY_PIP = 18;
        const PINKY_DIP = 19;
        const PINKY_TIP = 20;

        // Determinar si cada dedo está extendido
        const fingerStates = {
            thumb: this.isThumbExtended(landmarks),
            index: this.isFingerExtended(landmarks, INDEX_MCP, INDEX_PIP, INDEX_DIP, INDEX_TIP),
            middle: this.isFingerExtended(landmarks, MIDDLE_MCP, MIDDLE_PIP, MIDDLE_DIP, MIDDLE_TIP),
            ring: this.isFingerExtended(landmarks, RING_MCP, RING_PIP, RING_DIP, RING_TIP),
            pinky: this.isFingerExtended(landmarks, PINKY_MCP, PINKY_PIP, PINKY_DIP, PINKY_TIP),
        };

        // Calcular orientación de la palma
        const palmNormal = this.calculatePalmNormal(landmarks);

        // Verificar si pulgar e índice se tocan (para gesto OK)
        const thumbIndexTouching = this.areFingersTouching(
            landmarks[THUMB_TIP],
            landmarks[INDEX_TIP],
            0.05
        );

        // Dirección del pulgar (para thumbs up/down)
        const thumbDirection = this.getThumbDirection(landmarks);

        return {
            handedness: handedness.label, // 'Left' o 'Right'
            confidence: handedness.score,
            landmarks: landmarks,
            fingerStates: fingerStates,
            fingersExtendedCount: Object.values(fingerStates).filter((v) => v).length,
            palmNormal: palmNormal,
            thumbIndexTouching: thumbIndexTouching,
            thumbDirection: thumbDirection,
            wristPosition: landmarks[WRIST],
        };
    }

    /**
     * Verifica si el pulgar está extendido
     */
    isThumbExtended(landmarks) {
        const THUMB_CMC = 1;
        const THUMB_MCP = 2;
        const THUMB_IP = 3;
        const THUMB_TIP = 4;
        const INDEX_MCP = 5;

        // El pulgar se considera extendido si la punta está más lejos
        // del centro de la palma que la base
        const thumbTip = landmarks[THUMB_TIP];
        const thumbMCP = landmarks[THUMB_MCP];
        const indexMCP = landmarks[INDEX_MCP];

        // Calcular distancia desde la punta del pulgar al MCP del índice
        const tipToIndex = this.distance3D(thumbTip, indexMCP);
        const mcpToIndex = this.distance3D(thumbMCP, indexMCP);

        return tipToIndex > mcpToIndex * 0.8;
    }

    /**
     * Verifica si un dedo está extendido
     */
    isFingerExtended(landmarks, mcp, pip, dip, tip) {
        // Un dedo se considera extendido si la punta está más arriba
        // (menor Y) que el PIP
        const tipPoint = landmarks[tip];
        const pipPoint = landmarks[pip];
        const mcpPoint = landmarks[mcp];

        // Comparar la posición Y (en la imagen, Y menor = más arriba)
        // También verificar que no esté muy doblado
        const tipAbovePip = tipPoint.y < pipPoint.y;
        const pipAboveMcp = pipPoint.y < mcpPoint.y + 0.05;

        return tipAbovePip && pipAboveMcp;
    }

    /**
     * Calcula el vector normal de la palma
     */
    calculatePalmNormal(landmarks) {
        const WRIST = 0;
        const INDEX_MCP = 5;
        const PINKY_MCP = 17;

        const wrist = landmarks[WRIST];
        const indexMCP = landmarks[INDEX_MCP];
        const pinkyMCP = landmarks[PINKY_MCP];

        // Vectores en la palma
        const v1 = {
            x: indexMCP.x - wrist.x,
            y: indexMCP.y - wrist.y,
            z: indexMCP.z - wrist.z,
        };

        const v2 = {
            x: pinkyMCP.x - wrist.x,
            y: pinkyMCP.y - wrist.y,
            z: pinkyMCP.z - wrist.z,
        };

        // Producto cruz para obtener normal
        const normal = {
            x: v1.y * v2.z - v1.z * v2.y,
            y: v1.z * v2.x - v1.x * v2.z,
            z: v1.x * v2.y - v1.y * v2.x,
        };

        // Normalizar
        const length = Math.sqrt(normal.x ** 2 + normal.y ** 2 + normal.z ** 2);

        return {
            x: normal.x / length,
            y: normal.y / length,
            z: normal.z / length,
        };
    }

    /**
     * Verifica si dos puntos están cerca (tocándose)
     */
    areFingersTouching(point1, point2, threshold = 0.05) {
        return this.distance3D(point1, point2) < threshold;
    }

    /**
     * Calcula la distancia 3D entre dos puntos
     */
    distance3D(p1, p2) {
        return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2);
    }

    /**
     * Determina la dirección del pulgar
     */
    getThumbDirection(landmarks) {
        const THUMB_TIP = 4;
        const THUMB_MCP = 2;

        const tip = landmarks[THUMB_TIP];
        const mcp = landmarks[THUMB_MCP];

        const verticalDiff = mcp.y - tip.y; // Positivo si tip está arriba

        if (verticalDiff > 0.1) {
            return 'up';
        } else if (verticalDiff < -0.1) {
            return 'down';
        } else {
            return 'side';
        }
    }

    /**
     * Obtiene lista de cámaras disponibles
     */
    async getAvailableCameras() {
        try {
            // Primero solicitar permiso
            await navigator.mediaDevices.getUserMedia({ video: true });

            // Luego enumerar dispositivos
            const devices = await navigator.mediaDevices.enumerateDevices();
            const cameras = devices.filter((device) => device.kind === 'videoinput');

            return cameras.map((camera, index) => ({
                deviceId: camera.deviceId,
                label: camera.label || `Cámara ${index + 1}`,
            }));
        } catch (error) {
            console.error('[HandDetector] Error obteniendo cámaras:', error);
            return [];
        }
    }

    /**
     * Cambia a una cámara diferente
     */
    async switchCamera(deviceId) {
        if (this.isRunning) {
            this.stop();
            await this.start(deviceId);
        }
    }

    /**
     * Logger interno
     */
    log(message) {
        if (CONFIG.debug.enableLogs) {
            console.log(`[HandDetector] ${message}`);
        }
    }

    /**
     * Verifica si el navegador soporta las APIs necesarias
     */
    static checkSupport() {
        const support = {
            mediaDevices: !!navigator.mediaDevices,
            getUserMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
            webGL: (() => {
                try {
                    const canvas = document.createElement('canvas');
                    return !!(
                        window.WebGLRenderingContext &&
                        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
                    );
                } catch (e) {
                    return false;
                }
            })(),
        };

        support.fullSupport = support.mediaDevices && support.getUserMedia && support.webGL;

        return support;
    }
}

// Instancia global
let handDetector = null;
