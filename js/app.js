/**
 * SEÑAS CONNECT - Aplicación Principal
 *
 * Este archivo coordina todos los módulos de la aplicación:
 * - Inicialización
 * - Manejo de UI
 * - Flujo de datos entre módulos
 */

class SenasConnectApp {
    constructor() {
        // Estado de la aplicación
        this.state = {
            initialized: false,
            cameraActive: false,
            voiceActive: false,
            currentText: '',
            messageHistory: [],
        };

        // Referencias a elementos del DOM
        this.elements = {};

        // Módulos
        this.modules = {
            handDetector: null,
            signRecognizer: null,
            tts: null,
            stt: null,
            accessibility: null,
        };
    }

    /**
     * Inicializa la aplicación
     */
    async init() {
        this.log('Iniciando Señas Connect...');
        this.updateLoadingStatus('Verificando compatibilidad...');

        try {
            // Verificar soporte del navegador
            const support = this.checkBrowserSupport();
            if (!support.fullSupport) {
                this.showError('Tu navegador no soporta todas las funciones necesarias.');
                return;
            }

            // Cachear elementos del DOM
            this.updateLoadingStatus('Preparando interfaz...');
            this.cacheElements();

            // Inicializar módulos
            this.updateLoadingStatus('Cargando detector de manos...');
            await this.initModules();

            // Configurar eventos
            this.updateLoadingStatus('Configurando controles...');
            this.setupEventListeners();

            // Cargar cámaras disponibles
            this.updateLoadingStatus('Detectando cámaras...');
            await this.loadCameras();

            // Marcar como inicializado
            this.state.initialized = true;

            // Ocultar pantalla de carga
            this.hideLoadingScreen();

            // Mostrar instrucciones si está configurado
            if (CONFIG.ui.showInstructionsOnStart) {
                this.showInstructions();
            }

            this.log('Aplicación inicializada correctamente');
        } catch (error) {
            console.error('[App] Error en inicialización:', error);
            this.showError(`Error al inicializar: ${error.message}`);
        }
    }

    /**
     * Verifica el soporte del navegador
     */
    checkBrowserSupport() {
        const handSupport = HandDetector.checkSupport();
        const speechSupport = SpeechServices.checkSupport();

        const support = {
            ...handSupport,
            ...speechSupport,
            fullSupport: handSupport.fullSupport && (speechSupport.tts || speechSupport.stt),
        };

        this.log('Soporte del navegador:', support);
        return support;
    }

    /**
     * Cachea referencias a elementos del DOM
     */
    cacheElements() {
        this.elements = {
            // Pantalla de carga
            loadingScreen: document.getElementById('loading-screen'),
            loadingStatus: document.getElementById('loading-status'),

            // Contenedor principal
            app: document.getElementById('app'),

            // Banner de desbloqueo de audio
            audioUnlockBanner: document.getElementById('audio-unlock-banner'),
            btnUnlockAudio: document.getElementById('btn-unlock-audio'),

            // Panel de señas
            videoSigns: document.getElementById('video-signs'),
            canvasSigns: document.getElementById('canvas-signs'),
            outputText: document.getElementById('output-text'),
            btnStartCamera: document.getElementById('btn-start-camera'),
            btnStopCamera: document.getElementById('btn-stop-camera'),
            btnSpeak: document.getElementById('btn-speak'),
            btnClearSigns: document.getElementById('btn-clear-signs'),
            selectCamera: document.getElementById('select-camera'),
            indicatorHands: document.getElementById('indicator-hands'),
            indicatorGesture: document.getElementById('indicator-gesture'),

            // Panel de voz
            voiceText: document.getElementById('voice-text'),
            btnStartVoice: document.getElementById('btn-start-voice'),
            btnStopVoice: document.getElementById('btn-stop-voice'),
            btnClearVoice: document.getElementById('btn-clear-voice'),
            recordingIndicator: document.getElementById('recording-indicator'),
            historyContainer: document.getElementById('history-container'),

            // Modal
            modal: document.getElementById('modal-instructions'),
            btnCloseModal: document.getElementById('btn-close-modal'),
        };
    }

    /**
     * Inicializa los módulos de la aplicación
     */
    async initModules() {
        // Accesibilidad
        this.modules.accessibility = new AccessibilityManager();
        accessibilityManager = this.modules.accessibility;

        // Detector de manos
        this.modules.handDetector = new HandDetector();
        handDetector = this.modules.handDetector;
        this.modules.handDetector.setElements(this.elements.videoSigns, this.elements.canvasSigns);

        // Reconocedor de señas
        this.modules.signRecognizer = new SignRecognizer();
        signRecognizer = this.modules.signRecognizer;

        // Configurar callback del reconocedor
        this.modules.signRecognizer.onGestureRecognized = (data) => {
            this.handleGestureRecognized(data);
        };

        // Text-to-Speech
        this.modules.tts = new TextToSpeech();
        tts = this.modules.tts;

        // Speech-to-Text
        this.modules.stt = new SpeechToText();
        stt = this.modules.stt;

        // Configurar callbacks del STT
        this.modules.stt.onResult = (data) => {
            this.handleVoiceResult(data);
        };

        this.modules.stt.onInterim = (data) => {
            this.handleVoiceInterim(data);
        };

        this.modules.stt.onStart = () => {
            this.modules.accessibility.showRecording(true);
        };

        this.modules.stt.onEnd = () => {
            this.modules.accessibility.showRecording(false);
        };

        // Configurar callback del detector de manos
        this.modules.handDetector.onResultsReceived((data) => {
            this.handleHandDetection(data);
        });
    }

    /**
     * Configura los event listeners
     */
    setupEventListeners() {
        // === Panel de Señas ===

        // Botón iniciar cámara
        this.elements.btnStartCamera.addEventListener('click', () => {
            this.startCamera();
        });

        // Botón detener cámara
        this.elements.btnStopCamera.addEventListener('click', () => {
            this.stopCamera();
        });

        // Botón hablar
        this.elements.btnSpeak.addEventListener('click', () => {
            this.speakCurrentText();
        });

        // Botón limpiar señas
        this.elements.btnClearSigns.addEventListener('click', () => {
            this.clearSignsOutput();
        });

        // Selector de cámara
        this.elements.selectCamera.addEventListener('change', (e) => {
            if (e.target.value && this.state.cameraActive) {
                this.modules.handDetector.switchCamera(e.target.value);
            }
        });

        // === Panel de Voz ===

        // Botón iniciar voz
        this.elements.btnStartVoice.addEventListener('click', () => {
            this.startVoiceRecognition();
        });

        // Botón detener voz
        this.elements.btnStopVoice.addEventListener('click', () => {
            this.stopVoiceRecognition();
        });

        // Botón limpiar voz
        this.elements.btnClearVoice.addEventListener('click', () => {
            this.clearVoiceOutput();
        });

        // === Modal ===

        // Botón cerrar modal
        this.elements.btnCloseModal.addEventListener('click', () => {
            this.hideInstructions();
        });

        // Cerrar modal con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.elements.modal.classList.contains('hidden')) {
                this.hideInstructions();
            }
        });

        // Cerrar modal haciendo clic fuera
        this.elements.modal.addEventListener('click', (e) => {
            if (e.target === this.elements.modal) {
                this.hideInstructions();
            }
        });

        // === Desbloqueo de Audio en Móviles ===
        if (this.elements.btnUnlockAudio) {
            this.elements.btnUnlockAudio.addEventListener('click', () => {
                this.unlockAudioForMobile();
            });
        }
    }

    /**
     * Muestra el banner de desbloqueo de audio en móviles
     */
    showAudioUnlockBanner() {
        if (this.modules.tts && this.modules.tts.needsUnlock()) {
            this.elements.audioUnlockBanner.classList.remove('hidden');
            this.log('Mostrando banner de desbloqueo de audio para móvil');
        }
    }

    /**
     * Desbloquea el audio en móviles
     */
    async unlockAudioForMobile() {
        if (this.modules.tts) {
            await this.modules.tts.unlockAudio();
            this.elements.audioUnlockBanner.classList.add('hidden');
            this.modules.accessibility.showStatus('Audio activado', 'success');
            this.log('Audio desbloqueado exitosamente');
        }
    }

    /**
     * Carga las cámaras disponibles en el selector
     */
    async loadCameras() {
        try {
            const cameras = await this.modules.handDetector.getAvailableCameras();

            // Limpiar opciones existentes
            this.elements.selectCamera.innerHTML = '<option value="">Seleccionar cámara...</option>';

            // Agregar cámaras
            cameras.forEach((camera) => {
                const option = document.createElement('option');
                option.value = camera.deviceId;
                option.textContent = camera.label;
                this.elements.selectCamera.appendChild(option);
            });

            this.log(`${cameras.length} cámaras detectadas`);
        } catch (error) {
            console.error('[App] Error cargando cámaras:', error);
        }
    }

    // ========================================
    // CONTROL DE CÁMARA
    // ========================================

    async startCamera() {
        if (this.state.cameraActive) return;

        // Aprovechar esta interacción para desbloquear audio en móviles
        if (this.modules.tts && this.modules.tts.needsUnlock()) {
            this.modules.tts.unlockAudio().then(() => {
                this.log('Audio desbloqueado al iniciar cámara');
            });
        }

        try {
            this.modules.accessibility.showStatus('Iniciando cámara...', 'info');
            const selectedCamera = this.elements.selectCamera.value || null;
            await this.modules.handDetector.start(selectedCamera);

            this.state.cameraActive = true;
            this.elements.btnStartCamera.classList.add('hidden');
            this.elements.btnStopCamera.classList.remove('hidden');

            this.modules.accessibility.showStatus('Cámara iniciada', 'success');
            this.log('Cámara iniciada');
        } catch (error) {
            console.error('[App] Error iniciando cámara:', error);

            let errorMessage = 'Error al iniciar cámara';

            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                errorMessage = 'Permiso de cámara denegado';
                alert(
                    'Se necesita permiso para acceder a la cámara.\n\nPor favor, permite el acceso a la cámara en la configuración de tu navegador.'
                );
            } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
                errorMessage = 'No se encontró ninguna cámara';
                alert('No se detectó ninguna cámara en este dispositivo.');
            } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
                errorMessage = 'La cámara está en uso';
                alert('La cámara está siendo usada por otra aplicación. Cerrá otras apps que usen la cámara e intentá de nuevo.');
            } else if (error.name === 'OverconstrainedError') {
                errorMessage = 'Cámara no compatible';
                alert('Tu cámara no es compatible con la configuración requerida. Intentá con otra cámara.');
            } else if (error.message && error.message.includes('Timeout')) {
                errorMessage = 'Timeout de cámara';
                alert('La cámara tardó mucho en responder. Intentá de nuevo.');
            } else {
                alert(`Error al iniciar la cámara: ${error.message || 'Error desconocido'}`);
            }

            this.modules.accessibility.showStatus(errorMessage, 'error');
        }
    }

    stopCamera() {
        if (!this.state.cameraActive) return;

        this.modules.handDetector.stop();
        this.state.cameraActive = false;

        this.elements.btnStartCamera.classList.remove('hidden');
        this.elements.btnStopCamera.classList.add('hidden');

        // Resetear indicadores
        this.modules.accessibility.showHandsDetected(false);

        this.modules.accessibility.showStatus('Cámara detenida');
        this.log('Cámara detenida');
    }

    // ========================================
    // MANEJO DE DETECCIÓN DE MANOS
    // ========================================

    handleHandDetection(data) {
        // Actualizar indicador visual
        this.modules.accessibility.showHandsDetected(data.handsDetected);

        // Procesar con el reconocedor de señas
        if (data.handsDetected) {
            this.modules.signRecognizer.process(data);
        }
    }

    // ========================================
    // MANEJO DE GESTOS RECONOCIDOS
    // ========================================

    handleGestureRecognized(data) {
        const { gesture, text, confidence } = data;

        if (!text) return;

        // Actualizar texto mostrado
        this.state.currentText = text;
        this.elements.outputText.textContent = text;

        // Feedback visual
        this.modules.accessibility.showGestureRecognized(gesture);

        // Habilitar botón de hablar
        this.elements.btnSpeak.disabled = false;

        // Agregar al historial
        this.addToHistory('sign', text);

        // Auto-hablar si está configurado
        if (CONFIG.tts.autoSpeak) {
            // Verificar si necesita desbloquear audio en móvil
            if (this.modules.tts && this.modules.tts.needsUnlock()) {
                // Mostrar banner para que el usuario desbloquee manualmente
                this.showAudioUnlockBanner();
            } else {
                this.speakCurrentText();
            }
        }

        this.log(`Gesto reconocido: ${gesture.name} -> "${text}" (${(confidence * 100).toFixed(0)}%)`);
    }

    // ========================================
    // TEXT-TO-SPEECH
    // ========================================

    async speakCurrentText() {
        const text = this.state.currentText;
        if (!text) return;

        // Feedback visual
        this.elements.btnSpeak.classList.add('speaking');

        try {
            await this.modules.tts.speak(text);
        } catch (error) {
            console.error('[App] Error en TTS:', error);
        }

        this.elements.btnSpeak.classList.remove('speaking');
    }

    // ========================================
    // SPEECH-TO-TEXT
    // ========================================

    async startVoiceRecognition() {
        if (this.state.voiceActive) return;

        // Solicitar permiso de micrófono primero
        const hasPermission = await SpeechServices.requestMicrophonePermission();
        if (!hasPermission) {
            this.modules.accessibility.showStatus('Se necesita permiso de micrófono', 'error');
            return;
        }

        const started = this.modules.stt.start();
        if (started) {
            this.state.voiceActive = true;
            this.elements.btnStartVoice.classList.add('hidden');
            this.elements.btnStopVoice.classList.remove('hidden');
            this.elements.voiceText.textContent = 'Escuchando...';

            this.modules.accessibility.showStatus('Escuchando voz...', 'success');
            this.log('Reconocimiento de voz iniciado');
        }
    }

    stopVoiceRecognition() {
        if (!this.state.voiceActive) return;

        this.modules.stt.stop();
        this.state.voiceActive = false;

        this.elements.btnStartVoice.classList.remove('hidden');
        this.elements.btnStopVoice.classList.add('hidden');

        this.modules.accessibility.showStatus('Reconocimiento de voz detenido');
        this.log('Reconocimiento de voz detenido');
    }

    handleVoiceResult(data) {
        const { text, fullText, isFinal } = data;

        // Mostrar texto reconocido
        this.elements.voiceText.textContent = text || fullText;

        if (isFinal && text) {
            // Agregar al historial
            this.addToHistory('voice', text);
            this.log(`Voz reconocida: "${text}"`);
        }
    }

    handleVoiceInterim(data) {
        const { text } = data;
        // Mostrar texto provisional con indicador
        this.elements.voiceText.textContent = text + '...';
    }

    // ========================================
    // HISTORIAL
    // ========================================

    addToHistory(type, text) {
        const timestamp = new Date().toLocaleTimeString();

        // Agregar al estado
        this.state.messageHistory.push({
            type,
            text,
            timestamp,
        });

        // Limitar historial en estado
        if (this.state.messageHistory.length > CONFIG.history.maxMessages) {
            this.state.messageHistory.shift();
        }

        // Limitar elementos en DOM para evitar problemas de memoria
        const maxDomItems = 20;
        while (this.elements.historyContainer.children.length >= maxDomItems) {
            this.elements.historyContainer.removeChild(this.elements.historyContainer.firstChild);
        }

        // Crear elemento HTML
        const item = document.createElement('div');
        item.className = `history-item ${type}`;

        const icon = type === 'sign' ? '👐' : '🎤';
        item.innerHTML = `
            <span>${icon} ${text}</span>
            ${CONFIG.history.showTimestamp ? `<span class="timestamp">${timestamp}</span>` : ''}
        `;

        // Agregar al DOM
        this.elements.historyContainer.appendChild(item);

        // Scroll al último elemento
        this.elements.historyContainer.scrollTop = this.elements.historyContainer.scrollHeight;
    }

    // ========================================
    // LIMPIEZA
    // ========================================

    clearSignsOutput() {
        this.state.currentText = '';
        this.elements.outputText.textContent = 'Esperando señas...';
        this.elements.btnSpeak.disabled = true;
        this.modules.signRecognizer.reset();
    }

    clearVoiceOutput() {
        this.elements.voiceText.textContent = 'Presioná el botón y hablá...';
        this.modules.stt.clear();
    }

    // ========================================
    // UI
    // ========================================

    updateLoadingStatus(message) {
        if (this.elements.loadingStatus) {
            this.elements.loadingStatus.textContent = message;
        }
    }

    hideLoadingScreen() {
        if (this.elements.loadingScreen) {
            this.elements.loadingScreen.classList.add('hidden');
        }
        if (this.elements.app) {
            this.elements.app.classList.remove('hidden');
        }
    }

    showInstructions() {
        this.elements.modal.classList.remove('hidden');
        A11yUtils.trapFocus(this.elements.modal.querySelector('.modal-content'));
    }

    hideInstructions() {
        this.elements.modal.classList.add('hidden');
        // Devolver foco al primer botón de acción
        this.elements.btnStartCamera.focus();

        // Aprovechar la interacción para desbloquear audio en móviles
        if (this.modules.tts && this.modules.tts.needsUnlock()) {
            this.modules.tts.unlockAudio().then(() => {
                this.log('Audio desbloqueado al cerrar modal');
            });
        }
    }

    showError(message) {
        this.updateLoadingStatus(`Error: ${message}`);
        console.error('[App]', message);
    }

    // ========================================
    // UTILIDADES
    // ========================================

    log(message, data = null) {
        if (CONFIG.debug.enableLogs) {
            if (data) {
                console.log(`[App] ${message}`, data);
            } else {
                console.log(`[App] ${message}`);
            }
        }
    }
}

// ========================================
// INICIALIZACIÓN
// ========================================

// Instancia global de la aplicación
let app = null;

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    app = new SenasConnectApp();
    app.init();
});

// Manejar errores globales
window.addEventListener('error', (event) => {
    console.error('[Global Error]', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('[Unhandled Promise Rejection]', event.reason);
});
