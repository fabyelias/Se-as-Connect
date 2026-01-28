
/**
 * SEÑAS CONNECT - Diccionario de Señas Estáticas
 *
 * Este archivo contiene las "reglas" para reconocer señas estáticas,
 * como las letras del abecedario y los números.
 *
 * Cada seña se define por el estado de los cinco dedos de la mano.
 * El sistema compara la mano detectada en tiempo real con estas reglas
 * para encontrar una coincidencia.
 *
 * NOTA: Algunas señas pueden tener la misma configuración de dedos
 * (por ejemplo, "B" y "4"). En estos casos, se agrupan.
 * La diferenciación de señas más complejas o con movimiento
 * requerirá un modelo de Machine Learning (Fase 2).
 */

const STATIC_SIGN_DICTIONARY = [
    // --- LETRAS ---

    {
        name: 'A',
        rules: {
            thumb: true,
            index: false,
            middle: false,
            ring: false,
            pinky: false,
        },
    },
    {
        name: 'B / 4',
        rules: {
            thumb: false,
            index: true,
            middle: true,
            ring: true,
            pinky: true,
        },
    },
    // 'C' es difícil de definir con reglas simples, ya que es una forma curva.
    // Se necesitará un análisis más avanzado (curvatura de los dedos).
    {
        name: 'E',
        rules: {
            thumb: false,
            index: false,
            middle: false,
            ring: false,
            pinky: false,
        },
    },
    {
        name: 'I',
        rules: {
            thumb: false,
            index: false,
            middle: false,
            ring: false,
            pinky: true,
        },
    },
    {
        name: 'L',
        rules: {
            thumb: true,
            index: true,
            middle: false,
            ring: false,
            pinky: false,
        },
    },
    // 'O' es similar a 'C', requiere análisis de curvatura.
    {
        name: 'U / V / 2',
        rules: {
            thumb: false,
            index: true,
            middle: true,
            ring: false,
            pinky: false,
        },
    },
    {
        name: 'W / 6',
        rules: {
            thumb: false,
            index: true,
            middle: true,
            ring: true,
            pinky: false,
        },
    },
    {
        name: 'Y',
        rules: {
            thumb: true,
            index: false,
            middle: false,
            ring: false,
            pinky: true,
        },
    },

    // --- NÚMEROS ---

    {
        name: '1 / D',
        rules: {
            thumb: false,
            index: true,
            middle: false,
            ring: false,
            pinky: false,
        },
    },
    // '2' está incluido en 'U / V'
    {
        name: '3',
        rules: {
            thumb: true,
            index: true,
            middle: true,
            ring: false,
            pinky: false,
        },
    },
    // '4' está incluido en 'B'
    {
        name: '5',
        rules: {
            thumb: true,
            index: true,
            middle: true,
            ring: true,
            pinky: true,
        },
    },
    // '6' está incluido en 'W'

    // --- GESTOS COMUNES ---
    {
        name: 'OK / F', // El gesto "OK" es similar a la letra F en LSA
        rules: {
            // Esta regla es más compleja, la afinaremos.
            // Por ahora, asumimos que los 3 dedos están extendidos.
            thumb: false,
            index: false,
            middle: true,
            ring: true,
            pinky: true,
            // Futura mejora: añadir una regla para "thumbIndexTouching: true"
        },
    },
    {
        name: 'TE AMO',
        rules: {
            thumb: true,
            index: true,
            middle: false,
            ring: false,
            pinky: true,
        },
    },
];
