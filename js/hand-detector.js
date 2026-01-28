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

        this.handsDetected = false;
        this.currentHandData = null;
    }

    async init() {
        this.log('Inicializando MediaPipe Hands...');
        this.hands = new Hands({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/${file}`,
        });

        this.hands.setOptions({
            maxNumHands: CONFIG.mediapipe.maxNumHands,
            modelComplexity: CONFIG.mediapipe.modelComplexity,
            minDetectionConfidence: CONFIG.mediapipe.minDetectionConfidence,
            minTrackingConfidence: CONFIG.mediapipe.minTrackingConfidence,
        });

        this.hands.onResults((results) => this.onResults(results));
        this.log('MediaPipe Hands inicializado correctamente');
        return true;
    }

    setElements(videoElement, canvasElement) {
        this.videoElement = videoElement;
        this.canvasElement = canvasElement;
        this.canvasCtx = canvasElement.getContext('2d');
    }

    onResultsReceived(callback) {
        this.onResultsCallback = callback;
    }

    async start(deviceId = null) {
        if (this.isRunning) return;

        this.camera = new Camera(this.videoElement, {
            onFrame: async () => {
                if (this.videoElement && this.hands) {
                    await this.hands.send({ image: this.videoElement });
                }
            },
            width: CONFIG.camera.width,
            height: CONFIG.camera.height,
            deviceId: deviceId,
        });

        try {
            await this.camera.start();
            this.isRunning = true;
            this.log('Cámara iniciada por HandDetector');
        } catch (error) {
            console.error('[HandDetector] Error al iniciar la cámara:', error);
            throw error;
        }
    }

    stop() {
        if (!this.isRunning || !this.camera) return;
        this.camera.stop();
        this.isRunning = false;
        if (this.canvasCtx) {
            this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        }
        this.log('Cámara detenida por HandDetector');
    }

    recognizeStaticSign(handData) {
        if (!handData || !handData.fingerStates) return null;
        const { fingerStates } = handData;

        for (const sign of STATIC_SIGN_DICTIONARY) {
            if (Object.entries(sign.rules).every(([finger, rule]) => fingerStates[finger] === rule)) {
                return sign.name;
            }
        }
        return null;
    }

    async recordSample(label, landmarks) {
        console.warn('La grabación de muestras no está implementada en el backend actual.');
        return { success: false, message: 'Función no implementada' };
    }

    async onResults(results) {
        const now = performance.now();
        this.fps = Math.round(1000 / (now - this.lastFrameTime));
        this.lastFrameTime = now;

        this.canvasCtx.save();
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.canvasCtx.drawImage(results.image, 0, 0, this.canvasElement.width, this.canvasElement.height);

        this.handsDetected = results.multiHandLandmarks && results.multiHandLandmarks.length > 0;

        let prediction = null;
        if (this.handsDetected) {
            const handDataArray = [];
            for (let i = 0; i < results.multiHandLandmarks.length; i++) {
                const landmarks = results.multiHandLandmarks[i];
                this.drawHand(landmarks);

                const handedness = results.multiHandedness[i];
                const handData = this.extractHandData(landmarks, handedness);
                handDataArray.push(handData);

                if (i === 0) { // Solo reconocer la primera mano detectada
                    prediction = this.recognizeStaticSign(handData);
                }
            }
            this.currentHandData = handDataArray;
        } else {
            this.currentHandData = null;
        }

        if (this.onResultsCallback) {
            this.onResultsCallback({
                handsDetected: this.handsDetected,
                hands: this.currentHandData || [],
                prediction: prediction,
                fps: this.fps,
            });
        }

        if (CONFIG.debug.showFPS) {
            this.drawFPS();
        }

        this.canvasCtx.restore();
    }

    drawHand(landmarks) {
        const isHighContrast = document.body.classList.contains('high-contrast');
        const connectionColor = isHighContrast ? CONFIG.drawing.connectionColorHighContrast : CONFIG.drawing.connectionColor;
        const landmarkColor = isHighContrast ? CONFIG.drawing.landmarkColorHighContrast : CONFIG.drawing.landmarkColor;

        drawConnectors(this.canvasCtx, landmarks, HAND_CONNECTIONS, { color: connectionColor, lineWidth: CONFIG.drawing.lineWidth });
        drawLandmarks(this.canvasCtx, landmarks, { color: landmarkColor, lineWidth: 1, radius: CONFIG.drawing.pointRadius });
    }

    drawFPS() {
        this.canvasCtx.font = '16px Arial';
        this.canvasCtx.fillStyle = '#00FF00';
        this.canvasCtx.fillText(`FPS: ${this.fps}`, 10, 20);
    }
    
    // --- LÓGICA DE DETECCIÓN DE DEDOS CORREGIDA ---

    extractHandData(landmarks, handedness) {
        const fingerStates = {
            thumb: this.isThumbExtended(landmarks),
            index: this.isFingerExtended(landmarks, 8, 6), // Tip, PIP
            middle: this.isFingerExtended(landmarks, 12, 10),
            ring: this.isFingerExtended(landmarks, 16, 14),
            pinky: this.isFingerExtended(landmarks, 20, 18),
        };
        return {
            handedness: handedness.label,
            confidence: handedness.score,
            landmarks: landmarks,
            fingerStates: fingerStates,
            fingersExtendedCount: Object.values(fingerStates).filter(v => v).length,
        };
    }

    isFingerExtended(landmarks, tipIdx, pipIdx) {
        const tip = landmarks[tipIdx];
        const pip = landmarks[pipIdx];
        const mcp = landmarks[pipIdx - 1]; // Joint before PIP is MCP
        const wrist = landmarks[0];

        // Un dedo está extendido si la punta está más lejos de la muñeca que la articulación PIP.
        // Y la articulación PIP está más lejos que la articulación MCP.
        // Esto es robusto a la rotación.
        return this.distance3D(wrist, tip) > this.distance3D(wrist, pip) &&
               this.distance3D(wrist, pip) > this.distance3D(wrist, mcp);
    }

    isThumbExtended(landmarks) {
        const tip = landmarks[4];
        const ip = landmarks[3];
        const mcp = landmarks[2];
        const wrist = landmarks[0];

        // El pulgar está extendido si la punta está más lejos de la muñeca que la articulación intermedia (IP).
        // Y la articulación IP está más lejos que la articulación MCP.
        return this.distance3D(wrist, tip) > this.distance3D(wrist, ip) &&
               this.distance3D(wrist, ip) > this.distance3D(wrist, mcp);
    }
    
    distance3D(p1, p2) {
        if (!p1 || !p2) return 0;
        return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2);
    }
    
    // --- FIN DE LA LÓGICA CORREGIDA ---

    async getAvailableCameras() {
        try {
            await navigator.mediaDevices.getUserMedia({ video: true });
            const devices = await navigator.mediaDevices.enumerateDevices();
            return devices.filter(device => device.kind === 'videoinput').map((camera, index) => ({
                deviceId: camera.deviceId,
                label: camera.label || `Cámara ${index + 1}`,
            }));
        } catch (error) {
            console.error('[HandDetector] Error obteniendo cámaras:', error);
            return [];
        }
    }

    async switchCamera(deviceId) {
        if (this.isRunning) {
            this.stop();
            await this.start(deviceId);
        }
    }

    log(message) {
        if (CONFIG.debug.enableLogs) {
            console.log(`[HandDetector] ${message}`);
        }
    }

    static checkSupport() {
        const support = {
            mediaDevices: !!navigator.mediaDevices,
            getUserMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
            webGL: (() => {
                try {
                    const canvas = document.createElement('canvas');
                    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
                } catch (e) {
                    return false;
                }
            })(),
        };
        support.fullSupport = support.mediaDevices && support.getUserMedia && support.webGL;
        return support;
    }
}
