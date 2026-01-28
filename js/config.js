/**
 * SEÑAS CONNECT - Configuración Global
 *
 * Este archivo contiene todas las configuraciones de la aplicación.
 * Modifica estos valores para ajustar el comportamiento.
 */

const CONFIG = {
    // ========================================
    // CONFIGURACIÓN DE MEDIAPIPE HANDS
    // ========================================
    mediapipe: {
        // Número máximo de manos a detectar (1 o 2)
        maxNumHands: 2,

        // Modelo de detección: 'full' (más preciso) o 'lite' (más rápido)
        modelComplexity: 1,

        // Confianza mínima para detectar una mano (0.0 - 1.0)
        minDetectionConfidence: 0.7,

        // Confianza mínima para seguir una mano detectada (0.0 - 1.0)
        minTrackingConfidence: 0.5,
    },

    // ========================================
    // CONFIGURACIÓN DE RECONOCIMIENTO DE SEÑAS
    // ========================================
    signRecognition: {
        // Confianza mínima para aceptar un gesto (0.0 - 1.0)
        minConfidence: 0.85,

        // Tiempo mínimo que un gesto debe mantenerse (ms)
        // Aumentado para evitar detecciones accidentales
        minGestureHoldTime: 1200,

        // Tiempo entre reconocimientos del mismo gesto (ms)
        gestureCooldown: 2000,

        // Cantidad de frames consecutivos con el mismo gesto para confirmar
        requiredConsecutiveFrames: 8,

        // Habilitar detección de secuencias de gestos
        enableSequenceDetection: true,

        // Máximo de gestos en una secuencia
        maxSequenceLength: 5,

        // Tiempo máximo entre gestos de una secuencia (ms)
        sequenceTimeout: 2000,
    },

    // ========================================
    // CONFIGURACIÓN DE TEXT-TO-SPEECH
    // ========================================
    tts: {
        // Idioma por defecto
        language: 'es-AR',

        // Idiomas alternativos (fallback)
        fallbackLanguages: ['es-ES', 'es-MX', 'es'],

        // Velocidad de habla (0.1 - 10)
        rate: 0.9,

        // Tono de voz (0 - 2)
        pitch: 1.0,

        // Volumen (0 - 1)
        volume: 1.0,

        // Reproducir automáticamente al detectar gesto
        autoSpeak: true,
    },

    // ========================================
    // CONFIGURACIÓN DE SPEECH-TO-TEXT
    // ========================================
    stt: {
        // Idioma de reconocimiento
        language: 'es-AR',

        // Idiomas alternativos
        fallbackLanguages: ['es-ES', 'es-MX'],

        // Modo continuo (sigue escuchando)
        continuous: true,

        // Resultados intermedios (en tiempo real)
        interimResults: true,

        // Tiempo máximo de silencio antes de pausar (ms)
        silenceTimeout: 3000,
    },

    // ========================================
    // CONFIGURACIÓN DE CÁMARA
    // ========================================
    camera: {
        // Resolución preferida (más baja para evitar zoom digital)
        width: { ideal: 640, max: 1280 },
        height: { ideal: 480, max: 720 },

        // Cámara preferida ('user' = frontal, 'environment' = trasera)
        facingMode: 'user',

        // Framerate
        frameRate: { ideal: 30, min: 15 },

        // Deshabilitar zoom automático de la cámara
        advanced: [
            { zoom: 1.0 },
            { focusMode: 'continuous' },
        ],
    },

    // ========================================
    // CONFIGURACIÓN DE UI/ACCESIBILIDAD
    // ========================================
    ui: {
        // Mostrar modal de instrucciones al inicio
        showInstructionsOnStart: false,

        // Guardar preferencias de accesibilidad en localStorage
        savePreferences: true,

        // Tiempo para mostrar mensajes de estado (ms)
        statusMessageDuration: 3000,

        // Animaciones habilitadas
        enableAnimations: true,

        // Vibración en móviles (si está disponible)
        enableVibration: true,
    },

    // ========================================
    // CONFIGURACIÓN DE HISTORIAL
    // ========================================
    history: {
        // Máximo de mensajes en historial
        maxMessages: 50,

        // Guardar historial en localStorage
        persistHistory: false,

        // Mostrar timestamp
        showTimestamp: true,
    },

    // ========================================
    // CONFIGURACIÓN DE DEBUG
    // ========================================
    debug: {
        // Mostrar logs en consola
        enableLogs: true,

        // Mostrar landmarks de manos en canvas
        showLandmarks: true,

        // Mostrar conexiones entre landmarks
        showConnections: true,

        // Mostrar FPS
        showFPS: false,

        // Mostrar confianza del gesto
        showConfidence: true,
    },

    // ========================================
    // ESTILOS DE DIBUJO (CANVAS)
    // ========================================
    drawing: {
        // Color de las conexiones de la mano
        connectionColor: '#00FF00',
        connectionColorHighContrast: '#FFFF00',

        // Color de los puntos (landmarks)
        landmarkColor: '#FF0000',
        landmarkColorHighContrast: '#00FF00',

        // Grosor de las líneas
        lineWidth: 3,

        // Tamaño de los puntos
        pointRadius: 5,
    },
};

// Función para obtener configuración con soporte de override
function getConfig(path, defaultValue = null) {
    const keys = path.split('.');
    let value = CONFIG;

    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            return defaultValue;
        }
    }

    return value;
}

// Función para actualizar configuración en runtime
function setConfig(path, newValue) {
    const keys = path.split('.');
    let obj = CONFIG;

    for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in obj)) {
            obj[keys[i]] = {};
        }
        obj = obj[keys[i]];
    }

    obj[keys[keys.length - 1]] = newValue;

    if (CONFIG.debug.enableLogs) {
        console.log(`[Config] ${path} = ${JSON.stringify(newValue)}`);
    }
}

// Log inicial
if (CONFIG.debug.enableLogs) {
    console.log('[Config] Configuración cargada:', CONFIG);
}
