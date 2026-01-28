/**
 * SEÑAS CONNECT - Archivo de Configuración Global
 *
 * Este archivo centraliza todas las configuraciones ajustables de la aplicación
 * para facilitar el mantenimiento y la personalización.
 */

const CONFIG = {

    // ========================================
    // CONFIGURACIÓN GENERAL
    // ========================================
    debug: {
        // Activa los logs en la consola para depuración
        enableLogs: true,
    },

    ui: {
        // Muestra las instrucciones al iniciar la aplicación
        showInstructionsOnStart: true,
    },

    // ========================================
    // CONFIGURACIÓN DEL DETECTOR DE MANOS (MediaPipe)
    // ========================================
    handModel: {
        // Número máximo de manos a detectar
        maxNumHands: 1,

        // Precisión del modelo (0.0 a 1.0)
        // Valores más altos son más precisos pero más lentos.
        minDetectionConfidence: 0.7, // Confianza mínima para detectar una mano
        minTrackingConfidence: 0.7,  // Confianza mínima para seguir la mano

        // Ruta al modelo de MediaPipe Hands
        modelPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1635986972/',
    },

    // ========================================
    // CONFIGURACIÓN DEL DICCIONARIO DE SEÑAS
    // ========================================
    signRecognition: {
        // Intervalo en milisegundos para comprobar si una seña se mantiene estable
        stabilityThreshold: 150,

        // Puntuación mínima de similitud para considerar una coincidencia (0.0 a 1.0)
        minSimilarityScore: 0.92, // Bastante estricto para evitar falsos positivos
    },

    // ========================================
    // CONFIGURACIÓN DE TEXT-TO-SPEECH (TTS)
    // ========================================
    tts: {
        // ¿Reproducir el audio automáticamente al detectar una seña?
        autoSpeak: true,

        // Voz a utilizar (depende del navegador y sistema operativo)
        // Para ver las voces disponibles, usar: speechSynthesis.getVoices()
        voice: 'Google español', // Intenta usar una voz común

        // Tono y velocidad de la voz
        pitch: 1,
        rate: 1,
    },
    
    // ========================================
    // CONFIGURACIÓN DEL HISTORIAL DE MENSAJES
    // ========================================
    history: {
        // Número máximo de mensajes a mostrar en el historial
        maxMessages: 50,

        // ¿Mostrar la hora en cada mensaje?
        showTimestamp: true,
    },

    // ========================================
    // CONFIGURACIÓN DE SPEECH-TO-TEXT (STT)
    // ========================================
    stt: {
        // Idioma para el reconocimiento de voz (formato BCP 47)
        lang: 'es-ES',

        // ¿Mostrar resultados intermedios mientras se habla?
        interimResults: true,

        // ¿Continuar escuchando indefinidamente?
        continuous: true,

        // Tiempo máximo de silencio antes de pausar (ms)
        silenceTimeout: 3000,
    },

    // ========================================
    // CONFIGURACIÓN DE CÁMARA
    // ========================================
    camera: {
        // Resolución solicitada. Usamos una resolución HD estándar para mayor compatibilidad.
        width: { ideal: 1280 },
        height: { ideal: 720 },

        // Cámara preferida ('user' = frontal, 'environment' = trasera)
        facingMode: 'user',

        // Framerate
        frameRate: { ideal: 30, min: 15 },

        // Opciones avanzadas para controlar el comportamiento de la cámara
        advanced: [
            { zoom: 1.0 },
            { focusMode: 'continuous' },
        ],
    },

    // ========================================
    // CONFIGURACIÓN DE ACCESIBILIDAD
    // ========================================
    accessibility: {
        // Duración de los mensajes de estado en pantalla (ms)
        statusMessageDuration: 3000,
    },

    // ========================================
    // CONFIGURACIÓN DEL ENTRENADOR (Futuro)
    // ========================================
    trainer: {
        // Almacenamiento de las señas personalizadas
        storageKey: 'senas-connect-custom-signs',
    },
};
