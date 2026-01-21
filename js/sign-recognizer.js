/**
 * SEÑAS CONNECT - Reconocedor de Señas
 *
 * Módulo que interpreta los datos de las manos detectadas
 * y los convierte en gestos/señas reconocibles.
 */

class SignRecognizer {
    constructor() {
        // Estado del reconocimiento
        this.currentGesture = null;
        this.gestureStartTime = 0;
        this.lastRecognizedGesture = null;
        this.lastRecognitionTime = 0;

        // Buffer para detección de secuencias
        this.gestureSequence = [];
        this.sequenceStartTime = 0;

        // Callbacks
        this.onGestureRecognized = null;
        this.onGestureStart = null;
        this.onGestureEnd = null;

        // Estadísticas
        this.stats = {
            totalRecognitions: 0,
            gestureHistory: [],
        };

        this.log('SignRecognizer inicializado');
    }

    /**
     * Procesa datos de manos y detecta gestos
     */
    process(handData) {
        if (!handData || !handData.handsDetected || handData.hands.length === 0) {
            this.handleNoHands();
            return null;
        }

        // Usar la mano principal (primera detectada)
        const hand = handData.hands[0];

        // Intentar reconocer un gesto simple
        const recognizedGesture = this.recognizeSimpleGesture(hand);

        if (recognizedGesture) {
            return this.handleGestureDetected(recognizedGesture, hand);
        } else {
            this.handleNoGesture();
            return null;
        }
    }

    /**
     * Reconoce gestos simples basados en el estado de los dedos
     */
    recognizeSimpleGesture(hand) {
        const { fingerStates, thumbDirection, thumbIndexTouching, fingersExtendedCount } = hand;

        let bestMatch = null;
        let bestConfidence = 0;

        // Iterar sobre todos los gestos simples definidos
        for (const [gestureKey, gesture] of Object.entries(SimpleGestures)) {
            const confidence = this.calculateGestureConfidence(hand, gesture);

            if (confidence > gesture.minConfidence && confidence > bestConfidence) {
                bestMatch = {
                    key: gestureKey,
                    ...gesture,
                    confidence: confidence,
                };
                bestConfidence = confidence;
            }
        }

        return bestMatch;
    }

    /**
     * Calcula la confianza de coincidencia con un gesto
     */
    calculateGestureConfidence(hand, gesture) {
        const { fingerStates, thumbDirection, thumbIndexTouching } = hand;
        const pattern = gesture.pattern;

        let matches = 0;
        let total = 5; // 5 dedos

        // Comparar estado de cada dedo
        for (const finger of ['thumb', 'index', 'middle', 'ring', 'pinky']) {
            const expected = pattern[finger];
            const actual = fingerStates[finger];

            // Manejar casos especiales
            if (expected === 'circle') {
                // Para gesto OK, verificar que los dedos se tocan
                if (finger === 'thumb' || finger === 'index') {
                    if (thumbIndexTouching) matches++;
                }
            } else if (typeof expected === 'boolean') {
                if (expected === actual) matches++;
            }
        }

        let confidence = matches / total;

        // Verificaciones adicionales
        if (gesture.thumbDirection && thumbDirection !== gesture.thumbDirection) {
            confidence *= 0.5;
        }

        if (gesture.special === 'thumb_index_touching' && !thumbIndexTouching) {
            confidence *= 0.3;
        }

        return confidence;
    }

    /**
     * Maneja cuando se detecta un gesto
     */
    handleGestureDetected(gesture, hand) {
        const now = Date.now();

        // Verificar si es el mismo gesto que antes
        if (this.currentGesture && this.currentGesture.key === gesture.key) {
            // Mismo gesto, verificar tiempo de hold
            const holdTime = now - this.gestureStartTime;

            if (holdTime >= CONFIG.signRecognition.minGestureHoldTime) {
                // Verificar cooldown para evitar repetición
                if (
                    !this.lastRecognizedGesture ||
                    this.lastRecognizedGesture.key !== gesture.key ||
                    now - this.lastRecognitionTime > CONFIG.signRecognition.gestureCooldown
                ) {
                    // ¡Gesto confirmado!
                    this.confirmGesture(gesture, hand);
                    return gesture;
                }
            }
        } else {
            // Nuevo gesto potencial
            this.currentGesture = gesture;
            this.gestureStartTime = now;

            if (this.onGestureStart) {
                this.onGestureStart(gesture);
            }

            this.log(`Gesto potencial: ${gesture.name} (${(gesture.confidence * 100).toFixed(0)}%)`);
        }

        return null;
    }

    /**
     * Confirma un gesto reconocido
     */
    confirmGesture(gesture, hand) {
        const now = Date.now();

        this.lastRecognizedGesture = gesture;
        this.lastRecognitionTime = now;
        this.stats.totalRecognitions++;

        // Agregar al historial
        this.stats.gestureHistory.push({
            gesture: gesture.key,
            text: gesture.text,
            time: now,
            confidence: gesture.confidence,
        });

        // Limitar historial
        if (this.stats.gestureHistory.length > 100) {
            this.stats.gestureHistory.shift();
        }

        // Agregar a secuencia si está habilitado
        if (CONFIG.signRecognition.enableSequenceDetection) {
            this.addToSequence(gesture);
        }

        this.log(`✓ Gesto confirmado: ${gesture.name} -> "${gesture.text}"`);

        // Callback
        if (this.onGestureRecognized) {
            this.onGestureRecognized({
                gesture: gesture,
                text: gesture.text,
                confidence: gesture.confidence,
                hand: hand,
            });
        }
    }

    /**
     * Maneja cuando no hay manos detectadas
     */
    handleNoHands() {
        if (this.currentGesture) {
            if (this.onGestureEnd) {
                this.onGestureEnd(this.currentGesture);
            }
            this.currentGesture = null;
        }
    }

    /**
     * Maneja cuando no se reconoce ningún gesto
     */
    handleNoGesture() {
        if (this.currentGesture) {
            // El gesto anterior terminó
            if (this.onGestureEnd) {
                this.onGestureEnd(this.currentGesture);
            }
            this.currentGesture = null;
        }
    }

    /**
     * Agrega gesto a la secuencia actual
     */
    addToSequence(gesture) {
        const now = Date.now();

        // Verificar timeout de secuencia
        if (
            this.gestureSequence.length > 0 &&
            now - this.sequenceStartTime > CONFIG.signRecognition.sequenceTimeout
        ) {
            // Secuencia expirada, iniciar nueva
            this.gestureSequence = [];
        }

        // Iniciar tiempo de secuencia si es nuevo
        if (this.gestureSequence.length === 0) {
            this.sequenceStartTime = now;
        }

        // Agregar gesto
        this.gestureSequence.push({
            gesture: gesture.key,
            text: gesture.text,
            time: now,
        });

        // Limitar longitud
        if (this.gestureSequence.length > CONFIG.signRecognition.maxSequenceLength) {
            this.gestureSequence.shift();
        }

        // Verificar si la secuencia forma una palabra/frase conocida
        this.checkSequence();
    }

    /**
     * Verifica si la secuencia actual forma algo conocido
     */
    checkSequence() {
        // Por ahora solo concatenamos los textos
        // En el futuro, aquí se puede agregar lógica para
        // reconocer secuencias específicas que formen palabras

        const sequenceText = this.gestureSequence.map((g) => g.text).join('');

        this.log(`Secuencia actual: ${sequenceText}`);

        // Aquí se podría verificar contra un diccionario de secuencias
        // Por ejemplo: 'H' + 'O' + 'L' + 'A' -> "Hola" (deletreo)
    }

    /**
     * Obtiene el texto de la secuencia actual
     */
    getSequenceText() {
        return this.gestureSequence.map((g) => g.text).join('');
    }

    /**
     * Limpia la secuencia actual
     */
    clearSequence() {
        this.gestureSequence = [];
        this.sequenceStartTime = 0;
    }

    /**
     * Obtiene estadísticas de reconocimiento
     */
    getStats() {
        return {
            ...this.stats,
            currentGesture: this.currentGesture?.name || null,
            sequenceLength: this.gestureSequence.length,
        };
    }

    /**
     * Reinicia el reconocedor
     */
    reset() {
        this.currentGesture = null;
        this.gestureStartTime = 0;
        this.lastRecognizedGesture = null;
        this.lastRecognitionTime = 0;
        this.gestureSequence = [];
        this.sequenceStartTime = 0;
    }

    /**
     * Logger interno
     */
    log(message) {
        if (CONFIG.debug.enableLogs) {
            console.log(`[SignRecognizer] ${message}`);
        }
    }
}

// ========================================
// ANÁLISIS AVANZADO DE MANOS
// ========================================

/**
 * Funciones auxiliares para análisis más detallado
 */
const HandAnalysis = {
    /**
     * Calcula el ángulo entre tres puntos
     */
    calculateAngle(p1, p2, p3) {
        const v1 = { x: p1.x - p2.x, y: p1.y - p2.y };
        const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };

        const dot = v1.x * v2.x + v1.y * v2.y;
        const cross = v1.x * v2.y - v1.y * v2.x;

        return Math.atan2(cross, dot) * (180 / Math.PI);
    },

    /**
     * Calcula la distancia entre dos puntos
     */
    distance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    },

    /**
     * Determina si la mano está abierta o cerrada
     */
    isHandOpen(fingerStates) {
        const extended = Object.values(fingerStates).filter((v) => v).length;
        return extended >= 4;
    },

    /**
     * Calcula el centro de la palma
     */
    getPalmCenter(landmarks) {
        const palmIndices = [0, 5, 9, 13, 17]; // Muñeca y bases de dedos
        let sumX = 0,
            sumY = 0,
            sumZ = 0;

        for (const idx of palmIndices) {
            sumX += landmarks[idx].x;
            sumY += landmarks[idx].y;
            sumZ += landmarks[idx].z;
        }

        return {
            x: sumX / palmIndices.length,
            y: sumY / palmIndices.length,
            z: sumZ / palmIndices.length,
        };
    },

    /**
     * Detecta movimiento de la mano
     */
    detectMovement(previousLandmarks, currentLandmarks, threshold = 0.02) {
        if (!previousLandmarks) return null;

        const prevCenter = this.getPalmCenter(previousLandmarks);
        const currCenter = this.getPalmCenter(currentLandmarks);

        const dx = currCenter.x - prevCenter.x;
        const dy = currCenter.y - prevCenter.y;

        if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) {
            return 'stationary';
        }

        if (Math.abs(dx) > Math.abs(dy)) {
            return dx > 0 ? 'right' : 'left';
        } else {
            return dy > 0 ? 'down' : 'up';
        }
    },
};

// Instancia global
let signRecognizer = null;
