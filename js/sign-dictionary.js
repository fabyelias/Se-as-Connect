/**
 * SEÑAS CONNECT - Diccionario de Lengua de Señas
 *
 * Este archivo contiene el diccionario de señas reconocibles.
 * Basado en gestos comunes de LSA (Lengua de Señas Argentina) y ASL.
 *
 * IMPORTANTE: Este es un diccionario inicial extensible.
 * Para agregar nuevas señas, seguí las instrucciones al final del archivo.
 */

const SignDictionary = {
    // ========================================
    // ESTRUCTURA DE DATOS
    // ========================================

    /**
     * Cada seña se define por:
     * - id: Identificador único
     * - name: Nombre de la seña
     * - text: Texto a mostrar/hablar
     * - category: Categoría para organización
     * - handShape: Forma de la mano requerida
     * - fingerStates: Estado de cada dedo (extended/flexed)
     * - movement: Tipo de movimiento (si aplica)
     * - twoHands: Si requiere ambas manos
     * - description: Descripción para ayuda
     */

    // ========================================
    // ALFABETO DACTILOLÓGICO (Deletreo)
    // ========================================
    alphabet: {
        A: {
            id: 'letter_a',
            name: 'Letra A',
            text: 'A',
            fingerStates: {
                thumb: 'extended_side', // Pulgar al costado
                index: 'flexed',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            description: 'Puño cerrado con pulgar al costado',
        },
        B: {
            id: 'letter_b',
            name: 'Letra B',
            text: 'B',
            fingerStates: {
                thumb: 'flexed_across',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            description: 'Mano plana con dedos juntos, pulgar doblado',
        },
        C: {
            id: 'letter_c',
            name: 'Letra C',
            text: 'C',
            fingerStates: {
                thumb: 'curved',
                index: 'curved',
                middle: 'curved',
                ring: 'curved',
                pinky: 'curved',
            },
            handShape: 'c_shape',
            description: 'Mano en forma de C',
        },
        D: {
            id: 'letter_d',
            name: 'Letra D',
            text: 'D',
            fingerStates: {
                thumb: 'touching_middle',
                index: 'extended',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            description: 'Índice extendido, otros dedos forman círculo con pulgar',
        },
        E: {
            id: 'letter_e',
            name: 'Letra E',
            text: 'E',
            fingerStates: {
                thumb: 'flexed_across',
                index: 'curved_down',
                middle: 'curved_down',
                ring: 'curved_down',
                pinky: 'curved_down',
            },
            description: 'Dedos curvados hacia abajo, pulgar debajo',
        },
        // ... Continuar con el resto del alfabeto
    },

    // ========================================
    // NÚMEROS
    // ========================================
    numbers: {
        0: {
            id: 'number_0',
            name: 'Cero',
            text: '0',
            fingerStates: {
                thumb: 'touching_index',
                index: 'curved',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            handShape: 'o_shape',
            description: 'Forma de O con índice y pulgar',
        },
        1: {
            id: 'number_1',
            name: 'Uno',
            text: '1',
            fingerStates: {
                thumb: 'flexed',
                index: 'extended',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            description: 'Solo índice extendido',
        },
        2: {
            id: 'number_2',
            name: 'Dos',
            text: '2',
            fingerStates: {
                thumb: 'flexed',
                index: 'extended',
                middle: 'extended',
                ring: 'flexed',
                pinky: 'flexed',
            },
            description: 'Índice y medio extendidos (paz)',
        },
        3: {
            id: 'number_3',
            name: 'Tres',
            text: '3',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'flexed',
                pinky: 'flexed',
            },
            description: 'Pulgar, índice y medio extendidos',
        },
        4: {
            id: 'number_4',
            name: 'Cuatro',
            text: '4',
            fingerStates: {
                thumb: 'flexed',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            description: 'Cuatro dedos extendidos, pulgar doblado',
        },
        5: {
            id: 'number_5',
            name: 'Cinco',
            text: '5',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            description: 'Mano abierta, todos los dedos extendidos',
        },
        6: {
            id: 'number_6',
            name: 'Seis',
            text: '6',
            fingerStates: {
                thumb: 'touching_pinky',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'flexed',
            },
            description: 'Pulgar toca meñique, otros extendidos',
        },
        7: {
            id: 'number_7',
            name: 'Siete',
            text: '7',
            fingerStates: {
                thumb: 'touching_ring',
                index: 'extended',
                middle: 'extended',
                ring: 'flexed',
                pinky: 'extended',
            },
            description: 'Pulgar toca anular',
        },
        8: {
            id: 'number_8',
            name: 'Ocho',
            text: '8',
            fingerStates: {
                thumb: 'touching_middle',
                index: 'extended',
                middle: 'flexed',
                ring: 'extended',
                pinky: 'extended',
            },
            description: 'Pulgar toca medio',
        },
        9: {
            id: 'number_9',
            name: 'Nueve',
            text: '9',
            fingerStates: {
                thumb: 'touching_index',
                index: 'flexed',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            description: 'Pulgar toca índice doblado',
        },
        10: {
            id: 'number_10',
            name: 'Diez',
            text: '10',
            fingerStates: {
                thumb: 'extended',
                index: 'flexed',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            movement: 'shake',
            description: 'Pulgar extendido, mover la mano',
        },
    },

    // ========================================
    // PALABRAS Y FRASES COMUNES
    // ========================================
    common: {
        hola: {
            id: 'hola',
            name: 'Hola',
            text: 'Hola',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            movement: 'wave',
            description: 'Mano abierta, movimiento de saludo',
        },
        gracias: {
            id: 'gracias',
            name: 'Gracias',
            text: 'Gracias',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            startPosition: 'chin',
            movement: 'forward',
            description: 'Mano plana desde el mentón hacia adelante',
        },
        por_favor: {
            id: 'por_favor',
            name: 'Por favor',
            text: 'Por favor',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            movement: 'circular_chest',
            description: 'Mano plana en círculo sobre el pecho',
        },
        si: {
            id: 'si',
            name: 'Sí',
            text: 'Sí',
            handShape: 'fist',
            movement: 'nod',
            description: 'Puño cerrado que "asiente"',
        },
        no: {
            id: 'no',
            name: 'No',
            text: 'No',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'flexed',
                pinky: 'flexed',
            },
            movement: 'snap_close',
            description: 'Índice, medio y pulgar se cierran juntos',
        },
        ayuda: {
            id: 'ayuda',
            name: 'Ayuda',
            text: 'Necesito ayuda',
            twoHands: true,
            description: 'Puño sobre mano plana, movimiento hacia arriba',
        },
        agua: {
            id: 'agua',
            name: 'Agua',
            text: 'Agua',
            handShape: 'w_shape',
            movement: 'tap_chin',
            description: 'Forma de W tocando el mentón',
        },
        comida: {
            id: 'comida',
            name: 'Comida/Comer',
            text: 'Quiero comer',
            fingerStates: {
                thumb: 'touching_fingers',
                index: 'grouped',
                middle: 'grouped',
                ring: 'grouped',
                pinky: 'grouped',
            },
            movement: 'to_mouth',
            description: 'Dedos agrupados hacia la boca',
        },
        dinero: {
            id: 'dinero',
            name: 'Dinero',
            text: '¿Cuánto cuesta?',
            fingerStates: {
                thumb: 'rubbing',
                index: 'extended',
                middle: 'extended',
                ring: 'flexed',
                pinky: 'flexed',
            },
            movement: 'rub',
            description: 'Frotar pulgar contra índice y medio',
        },
        esperar: {
            id: 'esperar',
            name: 'Esperar',
            text: 'Esperá un momento',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            handOrientation: 'palm_down',
            movement: 'patting',
            description: 'Palma hacia abajo, movimiento de calma',
        },
        entender: {
            id: 'entender',
            name: 'Entender',
            text: 'Entiendo',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            startPosition: 'forehead',
            movement: 'flick_out',
            description: 'Índice en la frente que se abre',
        },
        no_entender: {
            id: 'no_entender',
            name: 'No entiendo',
            text: 'No entiendo',
            movement: 'shake_head_hands',
            description: 'Manos abiertas oscilando con negación',
        },
        repetir: {
            id: 'repetir',
            name: 'Repetir',
            text: '¿Podés repetir?',
            fingerStates: {
                thumb: 'extended',
                index: 'curved',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            movement: 'circular',
            description: 'Índice hace círculo',
        },
        nombre: {
            id: 'nombre',
            name: 'Nombre',
            text: '¿Cuál es tu nombre?',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'flexed',
                pinky: 'flexed',
            },
            twoHands: true,
            movement: 'tap_fingers',
            description: 'Dedos H de ambas manos se tocan',
        },
        bien: {
            id: 'bien',
            name: 'Bien',
            text: 'Estoy bien / Todo bien',
            fingerStates: {
                thumb: 'extended',
                index: 'flexed',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            handOrientation: 'thumb_up',
            description: 'Pulgar arriba',
        },
        mal: {
            id: 'mal',
            name: 'Mal',
            text: 'Estoy mal / No está bien',
            fingerStates: {
                thumb: 'extended',
                index: 'flexed',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            handOrientation: 'thumb_down',
            description: 'Pulgar abajo',
        },
    },

    // ========================================
    // FRASES PARA COMERCIO
    // ========================================
    commerce: {
        cuanto_cuesta: {
            id: 'cuanto_cuesta',
            name: 'Cuánto cuesta',
            text: '¿Cuánto cuesta esto?',
            movement: 'money_question',
            description: 'Seña de dinero + interrogación',
        },
        quiero_comprar: {
            id: 'quiero_comprar',
            name: 'Quiero comprar',
            text: 'Quiero comprar esto',
            movement: 'point_and_grab',
            description: 'Señalar y gesto de tomar',
        },
        este: {
            id: 'este',
            name: 'Este/Esto',
            text: 'Esto',
            fingerStates: {
                thumb: 'flexed',
                index: 'extended',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            movement: 'point',
            description: 'Señalar con índice',
        },
        bolsa: {
            id: 'bolsa',
            name: 'Bolsa',
            text: '¿Me das una bolsa?',
            twoHands: true,
            handShape: 'cupped',
            description: 'Manos formando bolsa',
        },
        cambio: {
            id: 'cambio',
            name: 'Cambio',
            text: '¿Tenés cambio?',
            twoHands: true,
            movement: 'exchange',
            description: 'Manos intercambiando posición',
        },
    },

    // ========================================
    // EMERGENCIAS
    // ========================================
    emergency: {
        emergencia: {
            id: 'emergencia',
            name: 'Emergencia',
            text: '¡Es una emergencia!',
            twoHands: true,
            movement: 'urgent_wave',
            description: 'Manos agitándose urgentemente',
        },
        dolor: {
            id: 'dolor',
            name: 'Dolor',
            text: 'Me duele',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            twoHands: true,
            movement: 'twist_opposite',
            description: 'Índices apuntándose, girando',
        },
        medico: {
            id: 'medico',
            name: 'Médico',
            text: 'Necesito un médico',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'flexed',
                pinky: 'flexed',
            },
            movement: 'pulse_check',
            description: 'Dedos en muñeca (tomar pulso)',
        },
        policia: {
            id: 'policia',
            name: 'Policía',
            text: 'Llamá a la policía',
            handShape: 'c_shape',
            position: 'shoulder',
            description: 'Forma de C en el hombro (insignia)',
        },
    },
};

// ========================================
// GESTOS SIMPLIFICADOS PARA DETECCIÓN
// ========================================
// Estos son patrones simplificados basados en la posición de los dedos
// que se pueden detectar más fácilmente con MediaPipe

const SimpleGestures = {
    // Mano abierta - todos los dedos extendidos
    open_hand: {
        name: 'Mano abierta',
        text: 'Hola',
        pattern: {
            thumb: true,
            index: true,
            middle: true,
            ring: true,
            pinky: true,
        },
        minConfidence: 0.8,
    },

    // Puño cerrado
    fist: {
        name: 'Puño',
        text: '',
        pattern: {
            thumb: false,
            index: false,
            middle: false,
            ring: false,
            pinky: false,
        },
        minConfidence: 0.8,
    },

    // Pulgar arriba
    thumbs_up: {
        name: 'Pulgar arriba',
        text: 'Bien / De acuerdo',
        pattern: {
            thumb: true,
            index: false,
            middle: false,
            ring: false,
            pinky: false,
        },
        thumbDirection: 'up',
        minConfidence: 0.85,
    },

    // Pulgar abajo
    thumbs_down: {
        name: 'Pulgar abajo',
        text: 'Mal / No está bien',
        pattern: {
            thumb: true,
            index: false,
            middle: false,
            ring: false,
            pinky: false,
        },
        thumbDirection: 'down',
        minConfidence: 0.85,
    },

    // Señalar (índice extendido)
    pointing: {
        name: 'Señalar',
        text: 'Esto',
        pattern: {
            thumb: false,
            index: true,
            middle: false,
            ring: false,
            pinky: false,
        },
        minConfidence: 0.85,
    },

    // Paz / Victoria (dos dedos)
    peace: {
        name: 'Paz / Dos',
        text: '2',
        pattern: {
            thumb: false,
            index: true,
            middle: true,
            ring: false,
            pinky: false,
        },
        minConfidence: 0.85,
    },

    // Tres dedos
    three: {
        name: 'Tres',
        text: '3',
        pattern: {
            thumb: true,
            index: true,
            middle: true,
            ring: false,
            pinky: false,
        },
        minConfidence: 0.85,
    },

    // Cuatro dedos
    four: {
        name: 'Cuatro',
        text: '4',
        pattern: {
            thumb: false,
            index: true,
            middle: true,
            ring: true,
            pinky: true,
        },
        minConfidence: 0.85,
    },

    // OK sign (círculo con pulgar e índice)
    ok_sign: {
        name: 'OK',
        text: 'OK / Perfecto',
        pattern: {
            thumb: 'circle',
            index: 'circle',
            middle: true,
            ring: true,
            pinky: true,
        },
        special: 'thumb_index_touching',
        minConfidence: 0.8,
    },

    // Rock / Cuernos
    rock: {
        name: 'Rock',
        text: '¡Genial!',
        pattern: {
            thumb: false,
            index: true,
            middle: false,
            ring: false,
            pinky: true,
        },
        minConfidence: 0.85,
    },

    // Llamar por teléfono
    phone: {
        name: 'Teléfono',
        text: 'Llamame / Teléfono',
        pattern: {
            thumb: true,
            index: false,
            middle: false,
            ring: false,
            pinky: true,
        },
        minConfidence: 0.85,
    },

    // Uno
    one: {
        name: 'Uno',
        text: '1',
        pattern: {
            thumb: false,
            index: true,
            middle: false,
            ring: false,
            pinky: false,
        },
        minConfidence: 0.85,
    },
};

// ========================================
// FUNCIONES DE UTILIDAD
// ========================================

/**
 * Obtiene todas las señas de una categoría
 */
function getSignsByCategory(category) {
    return SignDictionary[category] || {};
}

/**
 * Busca una seña por ID
 */
function getSignById(id) {
    for (const category of Object.values(SignDictionary)) {
        for (const sign of Object.values(category)) {
            if (sign.id === id) {
                return sign;
            }
        }
    }
    return null;
}

/**
 * Obtiene todas las categorías disponibles
 */
function getCategories() {
    return Object.keys(SignDictionary);
}

/**
 * Obtiene el texto de un gesto simple
 */
function getSimpleGestureText(gestureKey) {
    return SimpleGestures[gestureKey]?.text || '';
}

// ========================================
// CÓMO AGREGAR NUEVAS SEÑAS
// ========================================
/**
 * Para agregar una nueva seña:
 *
 * 1. Identificá la categoría apropiada (common, commerce, emergency, etc.)
 *    o creá una nueva si es necesario.
 *
 * 2. Agregá un nuevo objeto con la siguiente estructura:
 *
 *    nueva_sena: {
 *        id: 'nueva_sena',           // ID único
 *        name: 'Nombre visible',      // Nombre para mostrar
 *        text: 'Texto a hablar',      // Lo que se dice/muestra
 *        fingerStates: {              // Estado de cada dedo
 *            thumb: 'extended',       // extended, flexed, curved, etc.
 *            index: 'extended',
 *            middle: 'flexed',
 *            ring: 'flexed',
 *            pinky: 'flexed',
 *        },
 *        movement: 'tipo_movimiento', // Opcional: wave, circular, tap, etc.
 *        twoHands: false,             // Opcional: si requiere dos manos
 *        description: 'Descripción',  // Cómo hacer la seña
 *    },
 *
 * 3. Para gestos simples (solo posición de dedos), agregá a SimpleGestures:
 *
 *    nuevo_gesto: {
 *        name: 'Nombre',
 *        text: 'Texto',
 *        pattern: {
 *            thumb: true/false,
 *            index: true/false,
 *            middle: true/false,
 *            ring: true/false,
 *            pinky: true/false,
 *        },
 *        minConfidence: 0.85,
 *    },
 *
 * 4. Para señas más complejas con movimiento, se necesita entrenar
 *    un modelo de ML. Ver documentación del backend.
 */

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SignDictionary, SimpleGestures };
}
