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
        this.state = {
            initialized: false,
            cameraActive: false,
            voiceActive: false,
            currentText: '',
            messageHistory: [],
        };
        this.elements = {};
        this.modules = {
            handDetector: null,
            tts: null,
            stt: null,
            accessibility: null,
        };
    }

    async init() {
        this.log('Iniciando Señas Connect...');
        this.updateLoadingStatus('Verificando compatibilidad...');

        try {
            const support = this.checkBrowserSupport();
            if (!support.fullSupport) {
                this.showError('Tu navegador no soporta todas las funciones necesarias.');
                return;
            }

            this.updateLoadingStatus('Preparando interfaz...');
            this.cacheElements();

            this.updateLoadingStatus('Cargando módulos...');
            await this.initModules();

            this.updateLoadingStatus('Configurando controles...');
            this.setupEventListeners();

            this.updateLoadingStatus('Detectando cámaras...');
            await this.loadCameras();

            this.state.initialized = true;
            this.hideLoadingScreen();
            
            // Iniciar en pantalla completa como solicitado
            this.requestFullscreen();

            if (CONFIG.ui.showInstructionsOnStart) {
                this.showInstructions();
            }

            this.log('Aplicación inicializada correctamente');
        } catch (error) {
            console.error('[App] Error en inicialización:', error);
            this.showError(`Error al inicializar: ${error.message}`);
        }
    }

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

    cacheElements() {
        this.elements = {
            loadingScreen: document.getElementById('loading-screen'),
            loadingStatus: document.getElementById('loading-status'),
            app: document.getElementById('app'),
            audioUnlockBanner: document.getElementById('audio-unlock-banner'),
            btnUnlockAudio: document.getElementById('btn-unlock-audio'),
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
            trainingPanel: document.getElementById('training-panel'),
            inputSignName: document.getElementById('input-sign-name'),
            btnRecordSample: document.getElementById('btn-record-sample'),
            voiceText: document.getElementById('voice-text'),
            btnStartVoice: document.getElementById('btn-start-voice'),
            btnStopVoice: document.getElementById('btn-stop-voice'),
            btnClearVoice: document.getElementById('btn-clear-voice'),
            recordingIndicator: document.getElementById('recording-indicator'),
            historyContainer: document.getElementById('history-container'),
            modal: document.getElementById('modal-instructions'),
            btnCloseModal: document.getElementById('btn-close-modal'),
            btnModalGotIt: document.getElementById('btn-modal-got-it'),
        };
    }

    async initModules() {
        this.modules.accessibility = new AccessibilityManager();

        this.modules.handDetector = new HandDetector();
        this.modules.handDetector.setElements(this.elements.videoSigns, this.elements.canvasSigns);
        this.modules.handDetector.onResultsReceived((data) => this.handleHandDetection(data));

        this.modules.tts = new TextToSpeech();
        this.modules.stt = new SpeechToText();

        this.modules.stt.onResult = (data) => this.handleVoiceResult(data);
        this.modules.stt.onInterim = (data) => this.handleVoiceInterim(data);
        this.modules.stt.onStart = () => this.modules.accessibility.showRecording(true);
        this.modules.stt.onEnd = () => this.modules.accessibility.showRecording(false);
    }

    setupEventListeners() {
        this.elements.btnStartCamera.addEventListener('click', () => this.startCamera());
        this.elements.btnStopCamera.addEventListener('click', () => this.stopCamera());
        this.elements.btnSpeak.addEventListener('click', () => this.speakCurrentText());
        this.elements.btnClearSigns.addEventListener('click', () => this.clearSignsOutput());
        this.elements.selectCamera.addEventListener('change', (e) => {
            if (e.target.value && this.state.cameraActive) {
                this.modules.handDetector.switchCamera(e.target.value);
            }
        });

        this.elements.btnRecordSample.addEventListener('click', () => this.recordSample());
        this.elements.btnStartVoice.addEventListener('click', () => this.startVoiceRecognition());
        this.elements.btnStopVoice.addEventListener('click', () => this.stopVoiceRecognition());
        this.elements.btnClearVoice.addEventListener('click', () => this.clearVoiceOutput());

        this.elements.btnCloseModal.addEventListener('click', () => this.hideInstructions());
        this.elements.btnModalGotIt.addEventListener('click', () => this.hideInstructions());
        this.elements.modal.addEventListener('click', (e) => {
            if (e.target === this.elements.modal) this.hideInstructions();
        });
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'Escape' || e.key === 'Enter') && !this.elements.modal.classList.contains('hidden')) {
                e.preventDefault();
                this.hideInstructions();
            }
        });

        if (this.elements.btnUnlockAudio) {
            this.elements.btnUnlockAudio.addEventListener('click', () => this.unlockAudioForMobile());
        }
    }
    
    requestFullscreen() {
        const elem = document.documentElement;
        // La mayoría de navegadores modernos requieren que la petición de pantalla completa
        // sea iniciada por una acción del usuario (click, etc). 
        // No siempre funcionará al cargar la página, pero lo intentamos.
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(err => {
                this.log(`No se pudo entrar en pantalla completa automáticamente: ${err.message}`);
            });
        } else if (elem.mozRequestFullScreen) { // Firefox
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari & Opera
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE/Edge
            elem.msRequestFullscreen();
        }
    }

    async loadCameras() {
        try {
            const cameras = await this.modules.handDetector.getAvailableCameras();
            this.elements.selectCamera.innerHTML = '<option value="">Seleccionar cámara...</option>';
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

    async startCamera() {
        if (this.state.cameraActive) return;
        if (this.modules.tts && this.modules.tts.needsUnlock()) {
            this.modules.tts.unlockAudio().then(() => this.log('Audio desbloqueado al iniciar cámara'));
        }

        try {
            this.modules.accessibility.showStatus('Iniciando cámara...', 'info');
            const selectedCamera = this.elements.selectCamera.value || null;
            await this.modules.handDetector.start(selectedCamera);

            this.state.cameraActive = true;
            this.elements.btnStartCamera.classList.add('hidden');
            this.elements.btnStopCamera.classList.remove('hidden');
            this.elements.trainingPanel.classList.remove('hidden');

            this.modules.accessibility.showStatus('Cámara iniciada', 'success');
            this.log('Cámara iniciada');
        } catch (error) {
            console.error('[App] Error iniciando cámara:', error);
            this.modules.accessibility.showStatus('Error al iniciar cámara', 'error');
        }
    }

    stopCamera() {
        if (!this.state.cameraActive) return;

        this.modules.handDetector.stop();
        this.state.cameraActive = false;

        this.elements.btnStartCamera.classList.remove('hidden');
        this.elements.btnStopCamera.classList.add('hidden');
        this.elements.trainingPanel.classList.add('hidden');

        this.modules.accessibility.showHandsDetected(false);
        this.modules.accessibility.showStatus('Cámara detenida');
        this.log('Cámara detenida');
    }

    async recordSample() {
        if (!this.state.cameraActive || !this.modules.handDetector.handsDetected) {
            this.modules.accessibility.showStatus('No se detecta ninguna mano para grabar', 'error');
            return;
        }

        const label = this.elements.inputSignName.value.trim().toUpperCase();
        if (!label) {
            this.modules.accessibility.showStatus('Por favor, ingresá un nombre para la seña', 'error');
            return;
        }

        const landmarks = this.modules.handDetector.currentHandData[0].landmarks;
        if (!landmarks) {
            this.modules.accessibility.showStatus('No se pudieron obtener los datos de la mano', 'error');
            return;
        }

        this.modules.accessibility.showStatus(`Grabando muestra para "${label}"...`, 'info');
        const result = await this.modules.handDetector.recordSample(label, landmarks);

        if (result.success) {
            this.modules.accessibility.showStatus(`¡Muestra para "${label}" guardada!`, 'success');
        } else {
            this.modules.accessibility.showStatus(`Error al guardar: ${result.message}`, 'error');
        }
    }

    handleHandDetection(data) {
        this.modules.accessibility.showHandsDetected(data.handsDetected);
        this.handlePrediction(data.prediction);
    }

    handlePrediction(prediction) {
        const gestureName = prediction || '...'; // Muestra '...' si no hay predicción
        this.elements.outputText.textContent = gestureName;

        const gestureRecognized = !!prediction;
        this.modules.accessibility.showGestureRecognized({ name: prediction, recognized: gestureRecognized });

        this.elements.btnSpeak.disabled = !gestureRecognized;

        if (gestureRecognized && this.state.currentText !== prediction) {
            this.state.currentText = prediction;
            if (CONFIG.tts.autoSpeak) {
                if (this.modules.tts.needsUnlock()) {
                    this.showAudioUnlockBanner();
                } else {
                    this.speakCurrentText();
                }
            }
            this.log(`Predicción: "${prediction}"`);
        } else if (!gestureRecognized) {
            this.state.currentText = '';
        }
    }

    async speakCurrentText() {
        const text = this.state.currentText;
        if (!text) return;

        this.elements.btnSpeak.classList.add('speaking');
        try {
            await this.modules.tts.speak(text);
        } catch (error) {
            console.error('[App] Error en TTS:', error);
        } finally {
            this.elements.btnSpeak.classList.remove('speaking');
        }
    }

    async startVoiceRecognition() {
        if (this.state.voiceActive) return;

        const hasPermission = await SpeechServices.requestMicrophonePermission();
        if (!hasPermission) {
            this.modules.accessibility.showStatus('Se necesita permiso de micrófono', 'error');
            return;
        }

        if (this.modules.stt.start()) {
            this.state.voiceActive = true;
            this.elements.btnStartVoice.classList.add('hidden');
            this.elements.btnStopVoice.classList.remove('hidden');
            this.elements.voiceText.textContent = 'Escuchando...';
            this.log('Reconocimiento de voz iniciado');
        }
    }

    stopVoiceRecognition() {
        if (!this.state.voiceActive) return;
        this.modules.stt.stop();
        this.state.voiceActive = false;
        this.elements.btnStartVoice.classList.remove('hidden');
        this.elements.btnStopVoice.classList.add('hidden');
        this.log('Reconocimiento de voz detenido');
    }

    handleVoiceResult({ text, fullText, isFinal }) {
        this.elements.voiceText.textContent = text || fullText;
        if (isFinal && text) {
            this.addToHistory('voice', text);
            this.log(`Voz reconocida: "${text}"`);
        }
    }

    handleVoiceInterim({ text }) {
        this.elements.voiceText.textContent = text ? `${text}...` : 'Escuchando...';
    }

    addToHistory(type, text) {
        const timestamp = new Date().toLocaleTimeString();
        this.state.messageHistory.push({ type, text, timestamp });

        if (this.state.messageHistory.length > CONFIG.history.maxMessages) {
            this.state.messageHistory.shift();
        }

        const item = document.createElement('div');
        item.className = `history-item ${type}`;
        const icon = type === 'sign' ? '👐' : '🎤';
        item.innerHTML = `<span>${icon} ${text}</span>${CONFIG.history.showTimestamp ? `<span class="timestamp">${timestamp}</span>` : ''}`;

        this.elements.historyContainer.appendChild(item);
        this.elements.historyContainer.scrollTop = this.elements.historyContainer.scrollHeight;
    }

    clearSignsOutput() {
        this.state.currentText = '';
        this.elements.outputText.textContent = 'Esperando señas...';
        this.elements.btnSpeak.disabled = true;
    }

    clearVoiceOutput() {
        this.elements.voiceText.textContent = 'Presioná el botón y hablá...';
        this.modules.stt.clear();
    }
    
    showAudioUnlockBanner() {
        if (this.modules.tts && this.modules.tts.needsUnlock()) {
            this.elements.audioUnlockBanner.classList.remove('hidden');
        }
    }

    async unlockAudioForMobile() {
        if (this.modules.tts) {
            await this.modules.tts.unlockAudio();
            this.elements.audioUnlockBanner.classList.add('hidden');
            this.modules.accessibility.showStatus('Audio activado', 'success');
        }
    }

    updateLoadingStatus(message) {
        if (this.elements.loadingStatus) {
            this.elements.loadingStatus.textContent = message;
        }
    }

    hideLoadingScreen() {
        this.elements.loadingScreen.classList.add('hidden');
        this.elements.app.classList.remove('hidden');
    }

    showInstructions() {
        this.elements.modal.classList.remove('hidden');
        A11yUtils.trapFocus(this.elements.modal.querySelector('.modal-content')); // <-- CORREGIDO
    }

    hideInstructions() {
        this.elements.modal.classList.add('hidden');
        this.elements.btnStartCamera.focus();
        if (this.modules.tts && this.modules.tts.needsUnlock()) {
            this.modules.tts.unlockAudio();
        }
    }

    showError(message) {
        this.updateLoadingStatus(`Error: ${message}`);
        console.error('[App]', message);
    }

    log(message, data = null) {
        if (CONFIG.debug.enableLogs) {
            data ? console.log(`[App] ${message}`, data) : console.log(`[App] ${message}`);
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const app = new SenasConnectApp();
    app.init();
});

window.addEventListener('error', (event) => {
    console.error('[Global Error]', event.error);
});
window.addEventListener('unhandledrejection', (event) => {
    console.error('[Unhandled Promise Rejection]', event.reason);
});
