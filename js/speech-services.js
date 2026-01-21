/**
 * SEÑAS CONNECT - Servicios de Voz
 *
 * Módulo que maneja:
 * - Text-to-Speech (TTS): Convierte texto a audio
 * - Speech-to-Text (STT): Convierte voz a texto
 */

// ========================================
// TEXT-TO-SPEECH (TTS)
// ========================================

class TextToSpeech {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voice = null;
        this.isSpeaking = false;
        this.queue = [];
        this.onStart = null;
        this.onEnd = null;
        this.onError = null;

        this.init();
    }

    /**
     * Inicializa el TTS y busca la mejor voz en español
     */
    init() {
        if (!this.isSupported()) {
            console.error('[TTS] Speech Synthesis no soportado en este navegador');
            return;
        }

        // Las voces pueden cargar de forma asíncrona
        if (this.synth.getVoices().length > 0) {
            this.selectBestVoice();
        } else {
            this.synth.onvoiceschanged = () => {
                this.selectBestVoice();
            };
        }

        this.log('TTS inicializado');
    }

    /**
     * Selecciona la mejor voz disponible en español
     */
    selectBestVoice() {
        const voices = this.synth.getVoices();
        const languages = [CONFIG.tts.language, ...CONFIG.tts.fallbackLanguages];

        // Buscar voz en orden de preferencia de idioma
        for (const lang of languages) {
            // Primero buscar voces "premium" o de mejor calidad
            let voice = voices.find(
                (v) => v.lang.startsWith(lang.substring(0, 2)) && v.name.toLowerCase().includes('premium')
            );

            if (!voice) {
                // Buscar cualquier voz del idioma
                voice = voices.find((v) => v.lang.startsWith(lang.substring(0, 2)));
            }

            if (voice) {
                this.voice = voice;
                this.log(`Voz seleccionada: ${voice.name} (${voice.lang})`);
                return;
            }
        }

        // Fallback a la primera voz disponible
        if (voices.length > 0) {
            this.voice = voices[0];
            this.log(`Usando voz por defecto: ${this.voice.name}`);
        }
    }

    /**
     * Verifica si TTS está soportado
     */
    isSupported() {
        return 'speechSynthesis' in window;
    }

    /**
     * Habla un texto
     */
    speak(text, options = {}) {
        if (!this.isSupported()) {
            console.error('[TTS] No soportado');
            return Promise.reject(new Error('TTS no soportado'));
        }

        if (!text || text.trim() === '') {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            // Cancelar habla anterior si existe
            if (options.interrupt !== false) {
                this.synth.cancel();
            }

            const utterance = new SpeechSynthesisUtterance(text);

            // Configurar voz
            if (this.voice) {
                utterance.voice = this.voice;
            }

            // Configurar parámetros
            utterance.rate = options.rate || CONFIG.tts.rate;
            utterance.pitch = options.pitch || CONFIG.tts.pitch;
            utterance.volume = options.volume || CONFIG.tts.volume;
            utterance.lang = this.voice?.lang || CONFIG.tts.language;

            // Event handlers
            utterance.onstart = () => {
                this.isSpeaking = true;
                this.log(`Hablando: "${text}"`);
                if (this.onStart) this.onStart(text);
            };

            utterance.onend = () => {
                this.isSpeaking = false;
                this.log('Terminó de hablar');
                if (this.onEnd) this.onEnd(text);
                resolve();
            };

            utterance.onerror = (event) => {
                this.isSpeaking = false;
                console.error('[TTS] Error:', event.error);
                if (this.onError) this.onError(event.error);
                reject(event.error);
            };

            // Hablar
            this.synth.speak(utterance);
        });
    }

    /**
     * Detiene el habla actual
     */
    stop() {
        if (this.synth) {
            this.synth.cancel();
            this.isSpeaking = false;
        }
    }

    /**
     * Pausa el habla
     */
    pause() {
        if (this.synth) {
            this.synth.pause();
        }
    }

    /**
     * Reanuda el habla
     */
    resume() {
        if (this.synth) {
            this.synth.resume();
        }
    }

    /**
     * Obtiene todas las voces disponibles
     */
    getVoices() {
        return this.synth ? this.synth.getVoices() : [];
    }

    /**
     * Obtiene voces en español
     */
    getSpanishVoices() {
        return this.getVoices().filter((v) => v.lang.startsWith('es'));
    }

    /**
     * Cambia la voz
     */
    setVoice(voiceName) {
        const voice = this.getVoices().find((v) => v.name === voiceName);
        if (voice) {
            this.voice = voice;
            this.log(`Voz cambiada a: ${voice.name}`);
        }
    }

    /**
     * Logger
     */
    log(message) {
        if (CONFIG.debug.enableLogs) {
            console.log(`[TTS] ${message}`);
        }
    }
}

// ========================================
// SPEECH-TO-TEXT (STT)
// ========================================

class SpeechToText {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.finalTranscript = '';
        this.interimTranscript = '';

        // Callbacks
        this.onResult = null;
        this.onInterim = null;
        this.onStart = null;
        this.onEnd = null;
        this.onError = null;

        this.init();
    }

    /**
     * Inicializa el reconocimiento de voz
     */
    init() {
        // Verificar soporte
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.error('[STT] Speech Recognition no soportado en este navegador');
            return;
        }

        this.recognition = new SpeechRecognition();

        // Configuración
        this.recognition.lang = CONFIG.stt.language;
        this.recognition.continuous = CONFIG.stt.continuous;
        this.recognition.interimResults = CONFIG.stt.interimResults;
        this.recognition.maxAlternatives = 1;

        // Event handlers
        this.recognition.onstart = () => {
            this.isListening = true;
            this.log('Escuchando...');
            if (this.onStart) this.onStart();
        };

        this.recognition.onresult = (event) => {
            this.handleResult(event);
        };

        this.recognition.onerror = (event) => {
            this.handleError(event);
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.log('Dejó de escuchar');

            // Si estaba en modo continuo y no se detuvo manualmente, reiniciar
            if (this._shouldRestart) {
                this._shouldRestart = false;
                setTimeout(() => {
                    if (!this.isListening) {
                        this.start();
                    }
                }, 100);
            }

            if (this.onEnd) this.onEnd();
        };

        this.recognition.onspeechend = () => {
            this.log('Fin del habla detectado');
        };

        this.recognition.onnomatch = () => {
            this.log('No se pudo reconocer el habla');
        };

        this.log('STT inicializado');
    }

    /**
     * Verifica si STT está soportado
     */
    isSupported() {
        return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    }

    /**
     * Inicia el reconocimiento
     */
    start() {
        if (!this.recognition) {
            console.error('[STT] No inicializado');
            return false;
        }

        if (this.isListening) {
            this.log('Ya está escuchando');
            return true;
        }

        try {
            this.finalTranscript = '';
            this.interimTranscript = '';
            this._shouldRestart = true;
            this.recognition.start();
            return true;
        } catch (error) {
            console.error('[STT] Error al iniciar:', error);
            return false;
        }
    }

    /**
     * Detiene el reconocimiento
     */
    stop() {
        if (!this.recognition) return;

        this._shouldRestart = false;
        this.recognition.stop();
        this.isListening = false;
    }

    /**
     * Maneja los resultados del reconocimiento
     */
    handleResult(event) {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            const confidence = event.results[i][0].confidence;

            if (event.results[i].isFinal) {
                final += transcript;
                this.log(`Reconocido (${(confidence * 100).toFixed(0)}%): "${transcript}"`);
            } else {
                interim += transcript;
            }
        }

        // Actualizar transcripciones
        if (final) {
            this.finalTranscript += final;

            if (this.onResult) {
                this.onResult({
                    text: final.trim(),
                    fullText: this.finalTranscript.trim(),
                    isFinal: true,
                });
            }
        }

        if (interim) {
            this.interimTranscript = interim;

            if (this.onInterim) {
                this.onInterim({
                    text: interim,
                    isFinal: false,
                });
            }
        }
    }

    /**
     * Maneja errores
     */
    handleError(event) {
        let errorMessage = '';

        switch (event.error) {
            case 'no-speech':
                errorMessage = 'No se detectó voz';
                // No es un error crítico, reintentar
                this._shouldRestart = true;
                break;
            case 'aborted':
                errorMessage = 'Reconocimiento abortado';
                break;
            case 'audio-capture':
                errorMessage = 'No se pudo capturar audio. ¿El micrófono está disponible?';
                break;
            case 'network':
                errorMessage = 'Error de red. Se requiere conexión a internet.';
                break;
            case 'not-allowed':
                errorMessage = 'Permiso de micrófono denegado';
                break;
            case 'service-not-allowed':
                errorMessage = 'Servicio de reconocimiento no disponible';
                break;
            default:
                errorMessage = `Error: ${event.error}`;
        }

        console.error(`[STT] ${errorMessage}`);

        if (this.onError) {
            this.onError({
                error: event.error,
                message: errorMessage,
            });
        }
    }

    /**
     * Limpia las transcripciones
     */
    clear() {
        this.finalTranscript = '';
        this.interimTranscript = '';
    }

    /**
     * Obtiene el texto completo reconocido
     */
    getTranscript() {
        return this.finalTranscript.trim();
    }

    /**
     * Cambia el idioma
     */
    setLanguage(lang) {
        if (this.recognition) {
            this.recognition.lang = lang;
            this.log(`Idioma cambiado a: ${lang}`);
        }
    }

    /**
     * Logger
     */
    log(message) {
        if (CONFIG.debug.enableLogs) {
            console.log(`[STT] ${message}`);
        }
    }
}

// ========================================
// VERIFICACIÓN DE SOPORTE
// ========================================

const SpeechServices = {
    /**
     * Verifica el soporte de servicios de voz
     */
    checkSupport() {
        return {
            tts: 'speechSynthesis' in window,
            stt: !!(window.SpeechRecognition || window.webkitSpeechRecognition),
        };
    },

    /**
     * Solicita permisos de micrófono
     */
    async requestMicrophonePermission() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // Detener el stream inmediatamente, solo queremos el permiso
            stream.getTracks().forEach((track) => track.stop());
            return true;
        } catch (error) {
            console.error('[SpeechServices] Error solicitando permiso de micrófono:', error);
            return false;
        }
    },
};

// Instancias globales
let tts = null;
let stt = null;
