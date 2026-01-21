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
        F: {
            id: 'letter_f',
            name: 'Letra F',
            text: 'F',
            fingerStates: {
                thumb: 'touching_index',
                index: 'curved',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            description: 'Pulgar e índice forman círculo, otros dedos extendidos',
        },
        G: {
            id: 'letter_g',
            name: 'Letra G',
            text: 'G',
            fingerStates: {
                thumb: 'extended_side',
                index: 'extended_side',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            handOrientation: 'horizontal',
            description: 'Pulgar e índice extendidos horizontalmente',
        },
        H: {
            id: 'letter_h',
            name: 'Letra H',
            text: 'H',
            fingerStates: {
                thumb: 'flexed',
                index: 'extended_side',
                middle: 'extended_side',
                ring: 'flexed',
                pinky: 'flexed',
            },
            handOrientation: 'horizontal',
            description: 'Índice y medio extendidos horizontalmente',
        },
        I: {
            id: 'letter_i',
            name: 'Letra I',
            text: 'I',
            fingerStates: {
                thumb: 'flexed',
                index: 'flexed',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'extended',
            },
            description: 'Solo meñique extendido',
        },
        J: {
            id: 'letter_j',
            name: 'Letra J',
            text: 'J',
            fingerStates: {
                thumb: 'flexed',
                index: 'flexed',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'extended',
            },
            movement: 'j_curve',
            description: 'Meñique extendido, traza forma de J',
        },
        K: {
            id: 'letter_k',
            name: 'Letra K',
            text: 'K',
            fingerStates: {
                thumb: 'between_fingers',
                index: 'extended',
                middle: 'extended',
                ring: 'flexed',
                pinky: 'flexed',
            },
            description: 'Índice y medio en V, pulgar entre ellos',
        },
        L: {
            id: 'letter_l',
            name: 'Letra L',
            text: 'L',
            fingerStates: {
                thumb: 'extended_side',
                index: 'extended',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            description: 'Forma de L con pulgar e índice',
        },
        M: {
            id: 'letter_m',
            name: 'Letra M',
            text: 'M',
            fingerStates: {
                thumb: 'under_fingers',
                index: 'over_thumb',
                middle: 'over_thumb',
                ring: 'over_thumb',
                pinky: 'flexed',
            },
            description: 'Tres dedos sobre el pulgar',
        },
        N: {
            id: 'letter_n',
            name: 'Letra N',
            text: 'N',
            fingerStates: {
                thumb: 'under_fingers',
                index: 'over_thumb',
                middle: 'over_thumb',
                ring: 'flexed',
                pinky: 'flexed',
            },
            description: 'Dos dedos sobre el pulgar',
        },
        O: {
            id: 'letter_o',
            name: 'Letra O',
            text: 'O',
            fingerStates: {
                thumb: 'curved',
                index: 'curved',
                middle: 'curved',
                ring: 'curved',
                pinky: 'curved',
            },
            handShape: 'o_shape',
            description: 'Todos los dedos forman un círculo (O)',
        },
        P: {
            id: 'letter_p',
            name: 'Letra P',
            text: 'P',
            fingerStates: {
                thumb: 'between_fingers',
                index: 'extended_down',
                middle: 'extended_down',
                ring: 'flexed',
                pinky: 'flexed',
            },
            handOrientation: 'pointing_down',
            description: 'Como K pero apuntando hacia abajo',
        },
        Q: {
            id: 'letter_q',
            name: 'Letra Q',
            text: 'Q',
            fingerStates: {
                thumb: 'extended_down',
                index: 'extended_down',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            handOrientation: 'pointing_down',
            description: 'Como G pero apuntando hacia abajo',
        },
        R: {
            id: 'letter_r',
            name: 'Letra R',
            text: 'R',
            fingerStates: {
                thumb: 'flexed',
                index: 'crossed',
                middle: 'crossed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            description: 'Índice y medio cruzados',
        },
        S: {
            id: 'letter_s',
            name: 'Letra S',
            text: 'S',
            fingerStates: {
                thumb: 'across_fingers',
                index: 'flexed',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            description: 'Puño con pulgar sobre los dedos',
        },
        T: {
            id: 'letter_t',
            name: 'Letra T',
            text: 'T',
            fingerStates: {
                thumb: 'between_index_middle',
                index: 'flexed',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            description: 'Puño con pulgar entre índice y medio',
        },
        U: {
            id: 'letter_u',
            name: 'Letra U',
            text: 'U',
            fingerStates: {
                thumb: 'flexed',
                index: 'extended_together',
                middle: 'extended_together',
                ring: 'flexed',
                pinky: 'flexed',
            },
            description: 'Índice y medio juntos extendidos',
        },
        V: {
            id: 'letter_v',
            name: 'Letra V',
            text: 'V',
            fingerStates: {
                thumb: 'flexed',
                index: 'extended_apart',
                middle: 'extended_apart',
                ring: 'flexed',
                pinky: 'flexed',
            },
            description: 'Índice y medio separados en V',
        },
        W: {
            id: 'letter_w',
            name: 'Letra W',
            text: 'W',
            fingerStates: {
                thumb: 'flexed',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'flexed',
            },
            description: 'Tres dedos extendidos y separados',
        },
        X: {
            id: 'letter_x',
            name: 'Letra X',
            text: 'X',
            fingerStates: {
                thumb: 'flexed',
                index: 'hooked',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            description: 'Índice doblado como gancho',
        },
        Y: {
            id: 'letter_y',
            name: 'Letra Y',
            text: 'Y',
            fingerStates: {
                thumb: 'extended',
                index: 'flexed',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'extended',
            },
            description: 'Pulgar y meñique extendidos',
        },
        Z: {
            id: 'letter_z',
            name: 'Letra Z',
            text: 'Z',
            fingerStates: {
                thumb: 'flexed',
                index: 'extended',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            movement: 'z_shape',
            description: 'Índice traza forma de Z en el aire',
        },
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
    // EMOCIONES Y ESTADOS
    // ========================================
    emotions: {
        feliz: {
            id: 'feliz',
            name: 'Feliz',
            text: 'Estoy feliz',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            startPosition: 'chest',
            movement: 'circular_up',
            description: 'Manos abiertas en círculos ascendentes desde el pecho',
        },
        triste: {
            id: 'triste',
            name: 'Triste',
            text: 'Estoy triste',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            startPosition: 'face',
            movement: 'down',
            description: 'Manos abiertas bajando frente a la cara',
        },
        enojado: {
            id: 'enojado',
            name: 'Enojado',
            text: 'Estoy enojado',
            fingerStates: {
                thumb: 'flexed',
                index: 'curved',
                middle: 'curved',
                ring: 'curved',
                pinky: 'curved',
            },
            startPosition: 'face',
            movement: 'claw_out',
            description: 'Manos en garra frente a la cara, movimiento hacia afuera',
        },
        cansado: {
            id: 'cansado',
            name: 'Cansado',
            text: 'Estoy cansado',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            startPosition: 'chest',
            movement: 'drop_down',
            description: 'Manos en el pecho que caen hacia abajo',
        },
        asustado: {
            id: 'asustado',
            name: 'Asustado',
            text: 'Tengo miedo',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            twoHands: true,
            movement: 'trembling',
            description: 'Manos abiertas temblando frente al pecho',
        },
        sorprendido: {
            id: 'sorprendido',
            name: 'Sorprendido',
            text: '¡Qué sorpresa!',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            startPosition: 'face_sides',
            movement: 'open_out',
            description: 'Manos a los lados de la cara abriéndose',
        },
        amor: {
            id: 'amor',
            name: 'Te quiero/Amor',
            text: 'Te quiero',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'extended',
            },
            description: 'Seña ILY (I Love You) - pulgar, índice y meñique',
        },
        aburrido: {
            id: 'aburrido',
            name: 'Aburrido',
            text: 'Estoy aburrido',
            fingerStates: {
                thumb: 'flexed',
                index: 'extended',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            startPosition: 'nose_side',
            movement: 'twist',
            description: 'Índice al costado de la nariz, girando',
        },
        preocupado: {
            id: 'preocupado',
            name: 'Preocupado',
            text: 'Estoy preocupado',
            twoHands: true,
            movement: 'alternating_circles_forehead',
            description: 'Manos alternando círculos cerca de la frente',
        },
        nervioso: {
            id: 'nervioso',
            name: 'Nervioso',
            text: 'Estoy nervioso',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            twoHands: true,
            movement: 'shaking',
            description: 'Manos abiertas temblando',
        },
        emocionado: {
            id: 'emocionado',
            name: 'Emocionado',
            text: '¡Estoy emocionado!',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            twoHands: true,
            startPosition: 'chest',
            movement: 'excited_up',
            description: 'Manos en el pecho subiendo con energía',
        },
        tranquilo: {
            id: 'tranquilo',
            name: 'Tranquilo',
            text: 'Estoy tranquilo / Calma',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            handOrientation: 'palm_down',
            movement: 'slow_down',
            description: 'Palmas hacia abajo, movimiento lento descendente',
        },
        confundido: {
            id: 'confundido',
            name: 'Confundido',
            text: 'Estoy confundido',
            fingerStates: {
                thumb: 'extended',
                index: 'curved',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            startPosition: 'forehead',
            movement: 'scratching',
            description: 'Índice curvado rascando la frente',
        },
    },

    // ========================================
    // FAMILIA Y PERSONAS
    // ========================================
    family: {
        mama: {
            id: 'mama',
            name: 'Mamá',
            text: 'Mamá',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            startPosition: 'chin',
            movement: 'tap',
            description: 'Mano abierta, pulgar toca el mentón',
        },
        papa: {
            id: 'papa',
            name: 'Papá',
            text: 'Papá',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            startPosition: 'forehead',
            movement: 'tap',
            description: 'Mano abierta, pulgar toca la frente',
        },
        hermano: {
            id: 'hermano',
            name: 'Hermano',
            text: 'Hermano',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            twoHands: true,
            movement: 'tap_down',
            description: 'Seña de hombre + juntar índices',
        },
        hermana: {
            id: 'hermana',
            name: 'Hermana',
            text: 'Hermana',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            twoHands: true,
            movement: 'tap_chin_down',
            description: 'Seña de mujer + juntar índices',
        },
        abuelo: {
            id: 'abuelo',
            name: 'Abuelo',
            text: 'Abuelo',
            fingerStates: {
                thumb: 'curved',
                index: 'curved',
                middle: 'curved',
                ring: 'curved',
                pinky: 'curved',
            },
            startPosition: 'forehead',
            movement: 'arc_forward',
            description: 'Mano en C desde la frente hacia adelante',
        },
        abuela: {
            id: 'abuela',
            name: 'Abuela',
            text: 'Abuela',
            fingerStates: {
                thumb: 'curved',
                index: 'curved',
                middle: 'curved',
                ring: 'curved',
                pinky: 'curved',
            },
            startPosition: 'chin',
            movement: 'arc_forward',
            description: 'Mano en C desde el mentón hacia adelante',
        },
        hijo: {
            id: 'hijo',
            name: 'Hijo',
            text: 'Hijo',
            twoHands: true,
            movement: 'cradle_male',
            description: 'Movimiento de acunar + seña masculina',
        },
        hija: {
            id: 'hija',
            name: 'Hija',
            text: 'Hija',
            twoHands: true,
            movement: 'cradle_female',
            description: 'Movimiento de acunar + seña femenina',
        },
        amigo: {
            id: 'amigo',
            name: 'Amigo/a',
            text: 'Amigo',
            fingerStates: {
                thumb: 'extended',
                index: 'hooked',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            twoHands: true,
            movement: 'hook_fingers',
            description: 'Índices enganchados, dos veces',
        },
        persona: {
            id: 'persona',
            name: 'Persona',
            text: 'Persona',
            fingerStates: {
                thumb: 'flexed',
                index: 'extended',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            twoHands: true,
            movement: 'down_parallel',
            description: 'Índices paralelos bajando',
        },
        bebe: {
            id: 'bebe',
            name: 'Bebé',
            text: 'Bebé',
            twoHands: true,
            movement: 'rocking',
            description: 'Brazos meciendo como acunando',
        },
    },

    // ========================================
    // TIEMPO Y MOMENTOS
    // ========================================
    time: {
        hoy: {
            id: 'hoy',
            name: 'Hoy',
            text: 'Hoy',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            twoHands: true,
            handOrientation: 'palm_up',
            movement: 'down_together',
            description: 'Palmas hacia arriba, bajan juntas',
        },
        manana: {
            id: 'manana',
            name: 'Mañana',
            text: 'Mañana',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            startPosition: 'cheek',
            movement: 'forward_arc',
            description: 'Palma en mejilla, arco hacia adelante',
        },
        ayer: {
            id: 'ayer',
            name: 'Ayer',
            text: 'Ayer',
            fingerStates: {
                thumb: 'extended',
                index: 'flexed',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            startPosition: 'cheek',
            movement: 'backward',
            description: 'Pulgar hacia atrás sobre el hombro',
        },
        ahora: {
            id: 'ahora',
            name: 'Ahora',
            text: 'Ahora',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            twoHands: true,
            handOrientation: 'palm_up',
            movement: 'down_sharp',
            description: 'Palmas hacia arriba, bajan con énfasis',
        },
        despues: {
            id: 'despues',
            name: 'Después',
            text: 'Después / Luego',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            startPosition: 'front',
            movement: 'forward',
            description: 'Mano plana moviéndose hacia adelante',
        },
        antes: {
            id: 'antes',
            name: 'Antes',
            text: 'Antes',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            movement: 'backward_wave',
            description: 'Mano plana moviéndose hacia atrás',
        },
        siempre: {
            id: 'siempre',
            name: 'Siempre',
            text: 'Siempre',
            fingerStates: {
                thumb: 'flexed',
                index: 'extended',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            movement: 'continuous_circle',
            description: 'Índice haciendo círculos continuos',
        },
        nunca: {
            id: 'nunca',
            name: 'Nunca',
            text: 'Nunca',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            movement: 'wave_away',
            description: 'Mano abierta alejándose con negación',
        },
        tarde: {
            id: 'tarde',
            name: 'Tarde',
            text: 'Es tarde',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            handOrientation: 'palm_down',
            startPosition: 'wrist',
            description: 'Mano plana toca la muñeca (reloj)',
        },
        temprano: {
            id: 'temprano',
            name: 'Temprano',
            text: 'Es temprano',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            movement: 'sunrise',
            description: 'Mano subiendo como el sol',
        },
    },

    // ========================================
    // LUGARES
    // ========================================
    places: {
        casa: {
            id: 'casa',
            name: 'Casa',
            text: 'Casa / Hogar',
            fingerStates: {
                thumb: 'touching_fingers',
                index: 'grouped',
                middle: 'grouped',
                ring: 'grouped',
                pinky: 'grouped',
            },
            movement: 'roof_shape',
            description: 'Manos formando techo, bajan a los lados',
        },
        trabajo: {
            id: 'trabajo',
            name: 'Trabajo',
            text: 'Trabajo',
            handShape: 'fist',
            twoHands: true,
            movement: 'hammering',
            description: 'Puños golpeando uno sobre otro',
        },
        escuela: {
            id: 'escuela',
            name: 'Escuela',
            text: 'Escuela',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            twoHands: true,
            movement: 'clapping',
            description: 'Palmas aplaudiendo (llamar atención)',
        },
        hospital: {
            id: 'hospital',
            name: 'Hospital',
            text: 'Hospital',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'flexed',
                pinky: 'flexed',
            },
            startPosition: 'arm',
            movement: 'cross',
            description: 'Dedos dibujando cruz en el brazo',
        },
        tienda: {
            id: 'tienda',
            name: 'Tienda',
            text: 'Tienda / Negocio',
            fingerStates: {
                thumb: 'touching_fingers',
                index: 'grouped',
                middle: 'grouped',
                ring: 'grouped',
                pinky: 'grouped',
            },
            twoHands: true,
            movement: 'flipping',
            description: 'Manos con dedos agrupados girando',
        },
        banco: {
            id: 'banco',
            name: 'Banco',
            text: 'Banco',
            fingerStates: {
                thumb: 'extended',
                index: 'curved',
                middle: 'curved',
                ring: 'curved',
                pinky: 'curved',
            },
            movement: 'stacking',
            description: 'Manos apilando (dinero/monedas)',
        },
        restaurante: {
            id: 'restaurante',
            name: 'Restaurante',
            text: 'Restaurante',
            fingerStates: {
                thumb: 'touching_fingers',
                index: 'grouped',
                middle: 'grouped',
                ring: 'grouped',
                pinky: 'grouped',
            },
            movement: 'eating',
            startPosition: 'mouth',
            description: 'Dedos agrupados hacia la boca repetidamente',
        },
        bano: {
            id: 'bano',
            name: 'Baño',
            text: '¿Dónde está el baño?',
            fingerStates: {
                thumb: 'between_fingers',
                index: 'flexed',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            movement: 'shaking',
            description: 'Seña de T sacudiéndose',
        },
        calle: {
            id: 'calle',
            name: 'Calle',
            text: 'Calle',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            twoHands: true,
            handOrientation: 'facing',
            movement: 'forward_parallel',
            description: 'Palmas enfrentadas moviéndose hacia adelante',
        },
    },

    // ========================================
    // FRASES INTERACTIVAS COMPLETAS
    // ========================================
    phrases: {
        como_estas: {
            id: 'como_estas',
            name: '¿Cómo estás?',
            text: '¿Cómo estás?',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            twoHands: true,
            movement: 'thumbs_questioning',
            description: 'Pulgares arriba con movimiento interrogativo',
        },
        me_llamo: {
            id: 'me_llamo',
            name: 'Me llamo...',
            text: 'Me llamo',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'flexed',
                pinky: 'flexed',
            },
            twoHands: true,
            movement: 'name_sign',
            description: 'Dedos H tocándose + señalar a uno mismo',
        },
        mucho_gusto: {
            id: 'mucho_gusto',
            name: 'Mucho gusto',
            text: 'Mucho gusto en conocerte',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            twoHands: true,
            movement: 'handshake',
            description: 'Manos estrechándose',
        },
        hasta_luego: {
            id: 'hasta_luego',
            name: 'Hasta luego',
            text: 'Hasta luego / Chau',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            movement: 'wave_goodbye',
            description: 'Mano abierta despidiéndose',
        },
        buenos_dias: {
            id: 'buenos_dias',
            name: 'Buenos días',
            text: 'Buenos días',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            movement: 'sunrise_greeting',
            description: 'Seña de mañana + saludo',
        },
        buenas_noches: {
            id: 'buenas_noches',
            name: 'Buenas noches',
            text: 'Buenas noches',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            movement: 'sunset_greeting',
            description: 'Seña de noche + saludo',
        },
        donde_esta: {
            id: 'donde_esta',
            name: '¿Dónde está?',
            text: '¿Dónde está?',
            fingerStates: {
                thumb: 'flexed',
                index: 'extended',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            movement: 'searching',
            description: 'Índice moviéndose buscando',
        },
        que_hora_es: {
            id: 'que_hora_es',
            name: '¿Qué hora es?',
            text: '¿Qué hora es?',
            fingerStates: {
                thumb: 'flexed',
                index: 'extended',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            startPosition: 'wrist',
            movement: 'tapping_wrist',
            description: 'Índice tocando la muñeca (reloj)',
        },
        cuantos_anos: {
            id: 'cuantos_anos',
            name: '¿Cuántos años tenés?',
            text: '¿Cuántos años tenés?',
            movement: 'age_question',
            description: 'Seña de edad + interrogación',
        },
        de_donde_sos: {
            id: 'de_donde_sos',
            name: '¿De dónde sos?',
            text: '¿De dónde sos?',
            movement: 'origin_question',
            description: 'Seña de lugar + de dónde + interrogación',
        },
        no_se: {
            id: 'no_se',
            name: 'No sé',
            text: 'No sé',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            startPosition: 'forehead',
            movement: 'flick_away',
            description: 'Mano en la frente que se aleja',
        },
        perdon: {
            id: 'perdon',
            name: 'Perdón',
            text: 'Perdón / Lo siento',
            handShape: 'fist',
            startPosition: 'chest',
            movement: 'circular',
            description: 'Puño en círculo sobre el pecho',
        },
        con_permiso: {
            id: 'con_permiso',
            name: 'Con permiso',
            text: 'Con permiso / Disculpá',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            twoHands: true,
            movement: 'parting',
            description: 'Manos abriéndose paso',
        },
        que_significa: {
            id: 'que_significa',
            name: '¿Qué significa?',
            text: '¿Qué significa eso?',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            movement: 'questioning',
            description: 'Manos en forma de L, movimiento interrogativo',
        },
        mas_lento: {
            id: 'mas_lento',
            name: 'Más lento',
            text: 'Más lento por favor',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            handOrientation: 'palm_down',
            movement: 'slow_patting',
            description: 'Palma hacia abajo, movimiento lento',
        },
        otra_vez: {
            id: 'otra_vez',
            name: 'Otra vez',
            text: 'Otra vez / De nuevo',
            fingerStates: {
                thumb: 'extended',
                index: 'curved',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            twoHands: true,
            movement: 'flipping_repeat',
            description: 'Mano gira sobre la otra palma',
        },
        tengo_hambre: {
            id: 'tengo_hambre',
            name: 'Tengo hambre',
            text: 'Tengo hambre',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            startPosition: 'throat',
            movement: 'down_chest',
            description: 'Mano bajando desde la garganta al pecho',
        },
        tengo_sed: {
            id: 'tengo_sed',
            name: 'Tengo sed',
            text: 'Tengo sed',
            fingerStates: {
                thumb: 'extended',
                index: 'flexed',
                middle: 'flexed',
                ring: 'flexed',
                pinky: 'flexed',
            },
            startPosition: 'throat',
            movement: 'pointing_throat',
            description: 'Pulgar señalando la garganta',
        },
        necesito_ayuda: {
            id: 'necesito_ayuda',
            name: 'Necesito ayuda',
            text: 'Necesito ayuda',
            twoHands: true,
            movement: 'help_sign',
            description: 'Puño sobre palma abierta, subiendo',
        },
        puedo_ayudar: {
            id: 'puedo_ayudar',
            name: '¿Puedo ayudarte?',
            text: '¿Te puedo ayudar?',
            twoHands: true,
            movement: 'help_offer',
            description: 'Seña de ayuda + señalar al otro',
        },
        feliz_cumple: {
            id: 'feliz_cumple',
            name: 'Feliz cumpleaños',
            text: '¡Feliz cumpleaños!',
            twoHands: true,
            movement: 'birthday_sign',
            description: 'Seña de feliz + cumpleaños',
        },
        bienvenido: {
            id: 'bienvenido',
            name: 'Bienvenido',
            text: '¡Bienvenido!',
            fingerStates: {
                thumb: 'extended',
                index: 'extended',
                middle: 'extended',
                ring: 'extended',
                pinky: 'extended',
            },
            movement: 'welcoming',
            description: 'Mano abierta invitando a pasar',
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

    // Cinco / Mano abierta
    five: {
        name: 'Cinco',
        text: '5',
        pattern: {
            thumb: true,
            index: true,
            middle: true,
            ring: true,
            pinky: true,
        },
        minConfidence: 0.85,
    },

    // Te quiero (ILY - I Love You)
    i_love_you: {
        name: 'Te quiero',
        text: 'Te quiero',
        pattern: {
            thumb: true,
            index: true,
            middle: false,
            ring: false,
            pinky: true,
        },
        minConfidence: 0.85,
    },

    // Letra L
    letter_l: {
        name: 'Letra L',
        text: 'L',
        pattern: {
            thumb: true,
            index: true,
            middle: false,
            ring: false,
            pinky: false,
        },
        thumbDirection: 'side',
        minConfidence: 0.85,
    },

    // Letra C (mano curvada)
    letter_c: {
        name: 'Letra C',
        text: 'C',
        pattern: {
            thumb: 'curved',
            index: 'curved',
            middle: 'curved',
            ring: 'curved',
            pinky: 'curved',
        },
        handShape: 'c_curve',
        minConfidence: 0.8,
    },

    // Letra W (tres dedos)
    letter_w: {
        name: 'Letra W',
        text: 'W',
        pattern: {
            thumb: false,
            index: true,
            middle: true,
            ring: true,
            pinky: false,
        },
        minConfidence: 0.85,
    },

    // Letra Y (pulgar y meñique)
    letter_y: {
        name: 'Letra Y',
        text: 'Y',
        pattern: {
            thumb: true,
            index: false,
            middle: false,
            ring: false,
            pinky: true,
        },
        minConfidence: 0.85,
    },

    // Letra F (OK invertido)
    letter_f: {
        name: 'Letra F',
        text: 'F',
        pattern: {
            thumb: 'circle',
            index: 'circle',
            middle: true,
            ring: true,
            pinky: true,
        },
        special: 'thumb_index_circle',
        minConfidence: 0.8,
    },

    // Letra D (índice arriba, otros en círculo)
    letter_d: {
        name: 'Letra D',
        text: 'D',
        pattern: {
            thumb: 'circle',
            index: true,
            middle: 'circle',
            ring: false,
            pinky: false,
        },
        special: 'thumb_middle_touching',
        minConfidence: 0.8,
    },

    // Letra I (solo meñique)
    letter_i: {
        name: 'Letra I',
        text: 'I',
        pattern: {
            thumb: false,
            index: false,
            middle: false,
            ring: false,
            pinky: true,
        },
        minConfidence: 0.85,
    },

    // Letra A (puño con pulgar al lado)
    letter_a: {
        name: 'Letra A',
        text: 'A',
        pattern: {
            thumb: true,
            index: false,
            middle: false,
            ring: false,
            pinky: false,
        },
        thumbDirection: 'side',
        minConfidence: 0.85,
    },

    // Letra B (mano plana, pulgar doblado)
    letter_b: {
        name: 'Letra B',
        text: 'B',
        pattern: {
            thumb: false,
            index: true,
            middle: true,
            ring: true,
            pinky: true,
        },
        minConfidence: 0.85,
    },

    // Letra E (dedos curvados)
    letter_e: {
        name: 'Letra E',
        text: 'E',
        pattern: {
            thumb: 'curved',
            index: 'curved',
            middle: 'curved',
            ring: 'curved',
            pinky: 'curved',
        },
        handShape: 'claw_down',
        minConfidence: 0.8,
    },

    // Seis (pulgar toca meñique)
    six: {
        name: 'Seis',
        text: '6',
        pattern: {
            thumb: 'touching',
            index: true,
            middle: true,
            ring: true,
            pinky: 'touching',
        },
        special: 'thumb_pinky_touching',
        minConfidence: 0.8,
    },

    // Siete (pulgar toca anular)
    seven: {
        name: 'Siete',
        text: '7',
        pattern: {
            thumb: 'touching',
            index: true,
            middle: true,
            ring: 'touching',
            pinky: true,
        },
        special: 'thumb_ring_touching',
        minConfidence: 0.8,
    },

    // Ocho (pulgar toca medio)
    eight: {
        name: 'Ocho',
        text: '8',
        pattern: {
            thumb: 'touching',
            index: true,
            middle: 'touching',
            ring: true,
            pinky: true,
        },
        special: 'thumb_middle_touching',
        minConfidence: 0.8,
    },

    // Nueve (pulgar toca índice)
    nine: {
        name: 'Nueve',
        text: '9',
        pattern: {
            thumb: 'touching',
            index: 'touching',
            middle: true,
            ring: true,
            pinky: true,
        },
        special: 'thumb_index_touching_bent',
        minConfidence: 0.8,
    },

    // Cero / OK
    zero: {
        name: 'Cero',
        text: '0',
        pattern: {
            thumb: 'circle',
            index: 'circle',
            middle: true,
            ring: true,
            pinky: true,
        },
        special: 'thumb_index_circle',
        minConfidence: 0.8,
    },

    // Espera / Stop
    stop: {
        name: 'Espera',
        text: 'Esperá / Para',
        pattern: {
            thumb: true,
            index: true,
            middle: true,
            ring: true,
            pinky: true,
        },
        handOrientation: 'palm_forward',
        minConfidence: 0.85,
    },

    // Aplauso (dos manos)
    clap: {
        name: 'Aplauso',
        text: '¡Muy bien!',
        pattern: {
            thumb: true,
            index: true,
            middle: true,
            ring: true,
            pinky: true,
        },
        twoHands: true,
        movement: 'clapping',
        minConfidence: 0.8,
    },

    // Corazón con manos
    heart: {
        name: 'Corazón',
        text: 'Amor / Corazón',
        pattern: {
            thumb: 'curved',
            index: 'curved',
            middle: false,
            ring: false,
            pinky: false,
        },
        twoHands: true,
        handShape: 'heart',
        minConfidence: 0.75,
    },

    // Dinero (frotar dedos)
    money: {
        name: 'Dinero',
        text: 'Dinero / Plata',
        pattern: {
            thumb: true,
            index: true,
            middle: true,
            ring: false,
            pinky: false,
        },
        movement: 'rubbing',
        minConfidence: 0.8,
    },

    // Bien hecho / Perfecto
    perfect: {
        name: 'Perfecto',
        text: '¡Perfecto!',
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

    // Silencio (dedo en labios)
    silence: {
        name: 'Silencio',
        text: 'Silencio / Shh',
        pattern: {
            thumb: false,
            index: true,
            middle: false,
            ring: false,
            pinky: false,
        },
        position: 'lips',
        minConfidence: 0.85,
    },

    // Pensar
    thinking: {
        name: 'Pensando',
        text: 'Estoy pensando',
        pattern: {
            thumb: false,
            index: true,
            middle: false,
            ring: false,
            pinky: false,
        },
        position: 'temple',
        minConfidence: 0.85,
    },

    // Meñique arriba (promesa)
    pinky_promise: {
        name: 'Promesa',
        text: 'Te lo prometo',
        pattern: {
            thumb: false,
            index: false,
            middle: false,
            ring: false,
            pinky: true,
        },
        minConfidence: 0.85,
    },

    // Mano en garra
    claw: {
        name: 'Garra',
        text: '',
        pattern: {
            thumb: 'curved',
            index: 'curved',
            middle: 'curved',
            ring: 'curved',
            pinky: 'curved',
        },
        handShape: 'claw',
        minConfidence: 0.8,
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
