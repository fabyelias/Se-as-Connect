"""
SEÑAS CONNECT - Backend Principal

API REST y WebSocket para procesamiento avanzado de lengua de señas.
Este backend es OPCIONAL - la aplicación frontend funciona de forma
independiente para detección básica de gestos.

El backend proporciona:
- Procesamiento ML más avanzado
- Modelos de clasificación entrenados
- API para agregar nuevos gestos
- WebSocket para streaming en tiempo real
"""

import os
import json
import logging
from datetime import datetime
from typing import List, Optional

import numpy as np
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ========================================
# CONFIGURACIÓN
# ========================================

app = FastAPI(
    title="Señas Connect API",
    description="API para reconocimiento de lengua de señas",
    version="1.0.0",
)

# Configurar CORS para permitir peticiones del frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especificar dominios
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========================================
# MODELOS DE DATOS
# ========================================

class HandLandmark(BaseModel):
    """Punto de referencia de la mano"""
    x: float
    y: float
    z: float

class HandData(BaseModel):
    """Datos de una mano detectada"""
    landmarks: List[HandLandmark]
    handedness: str  # "Left" o "Right"
    confidence: float

class PredictionRequest(BaseModel):
    """Solicitud de predicción de gesto"""
    hands: List[HandData]
    timestamp: Optional[float] = None

class PredictionResponse(BaseModel):
    """Respuesta de predicción"""
    gesture: Optional[str]
    text: Optional[str]
    confidence: float
    processing_time_ms: float

class GestureTrainingData(BaseModel):
    """Datos para entrenar un nuevo gesto"""
    gesture_name: str
    text: str
    samples: List[List[HandLandmark]]

# ========================================
# CLASIFICADOR DE GESTOS
# ========================================

class GestureClassifier:
    """
    Clasificador de gestos usando los landmarks de las manos.

    Este es un clasificador básico basado en reglas y distancias.
    Para un clasificador más avanzado, se puede entrenar un modelo
    de ML con datos reales de LSA.
    """

    def __init__(self):
        self.gestures = self._load_gesture_definitions()
        self.model = None  # Placeholder para modelo ML
        logger.info("GestureClassifier inicializado")

    def _load_gesture_definitions(self):
        """Carga definiciones de gestos"""
        # Definiciones básicas de gestos
        return {
            "open_hand": {
                "name": "Mano abierta",
                "text": "Hola",
                "fingers_extended": [True, True, True, True, True],
            },
            "fist": {
                "name": "Puño",
                "text": "",
                "fingers_extended": [False, False, False, False, False],
            },
            "thumbs_up": {
                "name": "Pulgar arriba",
                "text": "Bien / De acuerdo",
                "fingers_extended": [True, False, False, False, False],
                "thumb_direction": "up",
            },
            "pointing": {
                "name": "Señalar",
                "text": "Esto",
                "fingers_extended": [False, True, False, False, False],
            },
            "peace": {
                "name": "Paz",
                "text": "2",
                "fingers_extended": [False, True, True, False, False],
            },
            "three": {
                "name": "Tres",
                "text": "3",
                "fingers_extended": [True, True, True, False, False],
            },
            "four": {
                "name": "Cuatro",
                "text": "4",
                "fingers_extended": [False, True, True, True, True],
            },
            "five": {
                "name": "Cinco",
                "text": "5",
                "fingers_extended": [True, True, True, True, True],
            },
            "ok": {
                "name": "OK",
                "text": "OK / Perfecto",
                "special": "thumb_index_touching",
            },
            "phone": {
                "name": "Teléfono",
                "text": "Llamame",
                "fingers_extended": [True, False, False, False, True],
            },
        }

    def predict(self, hand_data: HandData) -> tuple:
        """
        Predice el gesto basándose en los landmarks.

        Returns:
            tuple: (gesture_key, confidence)
        """
        landmarks = hand_data.landmarks

        # Calcular estado de los dedos
        fingers = self._get_finger_states(landmarks)
        thumb_direction = self._get_thumb_direction(landmarks)
        thumb_index_touching = self._check_thumb_index_touching(landmarks)

        best_match = None
        best_confidence = 0.0

        for gesture_key, gesture_def in self.gestures.items():
            confidence = self._calculate_match_confidence(
                gesture_def, fingers, thumb_direction, thumb_index_touching
            )

            if confidence > best_confidence:
                best_confidence = confidence
                best_match = gesture_key

        # Umbral mínimo de confianza
        if best_confidence < 0.7:
            return None, 0.0

        return best_match, best_confidence

    def _get_finger_states(self, landmarks: List[HandLandmark]) -> List[bool]:
        """Determina qué dedos están extendidos"""
        # Índices de landmarks importantes
        FINGER_TIPS = [4, 8, 12, 16, 20]  # Puntas de los dedos
        FINGER_PIPS = [3, 6, 10, 14, 18]  # Articulaciones medias

        states = []

        # Pulgar (lógica especial)
        thumb_tip = landmarks[4]
        thumb_ip = landmarks[3]
        thumb_mcp = landmarks[2]
        index_mcp = landmarks[5]

        # El pulgar está extendido si la punta está lejos del MCP del índice
        thumb_extended = self._distance(thumb_tip, index_mcp) > self._distance(thumb_mcp, index_mcp) * 0.8
        states.append(thumb_extended)

        # Otros dedos
        for i in range(1, 5):
            tip = landmarks[FINGER_TIPS[i]]
            pip = landmarks[FINGER_PIPS[i]]
            mcp = landmarks[FINGER_TIPS[i] - 3]  # MCP está 3 posiciones antes

            # El dedo está extendido si la punta está más arriba que PIP
            extended = tip.y < pip.y
            states.append(extended)

        return states

    def _get_thumb_direction(self, landmarks: List[HandLandmark]) -> str:
        """Determina la dirección del pulgar"""
        thumb_tip = landmarks[4]
        thumb_mcp = landmarks[2]

        y_diff = thumb_mcp.y - thumb_tip.y  # Positivo si apunta arriba

        if y_diff > 0.1:
            return "up"
        elif y_diff < -0.1:
            return "down"
        return "side"

    def _check_thumb_index_touching(self, landmarks: List[HandLandmark]) -> bool:
        """Verifica si el pulgar y el índice se tocan"""
        thumb_tip = landmarks[4]
        index_tip = landmarks[8]

        distance = self._distance(thumb_tip, index_tip)
        return distance < 0.05

    def _distance(self, p1: HandLandmark, p2: HandLandmark) -> float:
        """Calcula la distancia entre dos puntos"""
        return np.sqrt(
            (p1.x - p2.x) ** 2 +
            (p1.y - p2.y) ** 2 +
            (p1.z - p2.z) ** 2
        )

    def _calculate_match_confidence(
        self,
        gesture_def: dict,
        fingers: List[bool],
        thumb_direction: str,
        thumb_index_touching: bool
    ) -> float:
        """Calcula la confianza de coincidencia con un gesto"""

        # Si tiene patrón de dedos
        if "fingers_extended" in gesture_def:
            expected = gesture_def["fingers_extended"]
            matches = sum(1 for e, a in zip(expected, fingers) if e == a)
            confidence = matches / 5

            # Verificar dirección del pulgar si es requerida
            if "thumb_direction" in gesture_def:
                if thumb_direction != gesture_def["thumb_direction"]:
                    confidence *= 0.5

            return confidence

        # Gestos especiales
        if gesture_def.get("special") == "thumb_index_touching":
            if thumb_index_touching:
                # Verificar que otros dedos estén extendidos
                other_extended = all(fingers[2:])
                return 0.9 if other_extended else 0.7
            return 0.0

        return 0.0


# Instancia global del clasificador
classifier = GestureClassifier()

# ========================================
# GESTIÓN DE CONEXIONES WEBSOCKET
# ========================================

class ConnectionManager:
    """Gestiona conexiones WebSocket activas"""

    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info(f"Nueva conexión WebSocket. Total: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        logger.info(f"Conexión cerrada. Total: {len(self.active_connections)}")

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception as e:
                logger.error(f"Error enviando mensaje: {e}")


manager = ConnectionManager()

# ========================================
# ENDPOINTS DE LA API
# ========================================

@app.get("/")
async def root():
    """Endpoint raíz - información de la API"""
    return {
        "name": "Señas Connect API",
        "version": "1.0.0",
        "status": "online",
        "endpoints": {
            "predict": "/api/predict",
            "gestures": "/api/gestures",
            "websocket": "/ws",
        }
    }


@app.get("/api/health")
async def health_check():
    """Verificación de salud del servicio"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
    }


@app.post("/api/predict", response_model=PredictionResponse)
async def predict_gesture(request: PredictionRequest):
    """
    Predice el gesto a partir de los datos de la mano.

    Este endpoint recibe los landmarks de MediaPipe y devuelve
    el gesto reconocido con su texto asociado.
    """
    import time
    start_time = time.time()

    if not request.hands:
        return PredictionResponse(
            gesture=None,
            text=None,
            confidence=0.0,
            processing_time_ms=0.0,
        )

    # Usar la primera mano detectada
    hand = request.hands[0]

    # Predecir gesto
    gesture_key, confidence = classifier.predict(hand)

    # Obtener texto del gesto
    text = None
    gesture_name = None
    if gesture_key and gesture_key in classifier.gestures:
        gesture_def = classifier.gestures[gesture_key]
        text = gesture_def.get("text", "")
        gesture_name = gesture_def.get("name", gesture_key)

    processing_time = (time.time() - start_time) * 1000

    return PredictionResponse(
        gesture=gesture_name,
        text=text,
        confidence=confidence,
        processing_time_ms=round(processing_time, 2),
    )


@app.get("/api/gestures")
async def get_gestures():
    """Obtiene la lista de gestos disponibles"""
    gestures_list = []
    for key, gesture in classifier.gestures.items():
        gestures_list.append({
            "key": key,
            "name": gesture.get("name", key),
            "text": gesture.get("text", ""),
        })
    return {"gestures": gestures_list}


@app.post("/api/gestures")
async def add_gesture(data: GestureTrainingData):
    """
    Agrega un nuevo gesto al sistema.

    En una implementación completa, esto entrenaría el modelo
    con las muestras proporcionadas.
    """
    # Por ahora, solo registramos la intención
    logger.info(f"Solicitud para agregar gesto: {data.gesture_name}")

    return {
        "status": "received",
        "message": f"Gesto '{data.gesture_name}' recibido con {len(data.samples)} muestras. "
                   "Nota: El entrenamiento de modelos personalizados requiere implementación adicional.",
    }


# ========================================
# WEBSOCKET PARA TIEMPO REAL
# ========================================

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """
    WebSocket para procesamiento en tiempo real.

    Permite enviar datos de manos continuamente y recibir
    predicciones con mínima latencia.
    """
    await manager.connect(websocket)

    try:
        while True:
            # Recibir datos
            data = await websocket.receive_text()

            try:
                request_data = json.loads(data)

                # Convertir a modelo
                hands = []
                for hand_data in request_data.get("hands", []):
                    landmarks = [
                        HandLandmark(**lm) for lm in hand_data.get("landmarks", [])
                    ]
                    hands.append(HandData(
                        landmarks=landmarks,
                        handedness=hand_data.get("handedness", "Right"),
                        confidence=hand_data.get("confidence", 1.0),
                    ))

                if hands:
                    # Predecir
                    gesture_key, confidence = classifier.predict(hands[0])

                    # Preparar respuesta
                    response = {
                        "type": "prediction",
                        "gesture": None,
                        "text": None,
                        "confidence": confidence,
                    }

                    if gesture_key:
                        gesture_def = classifier.gestures.get(gesture_key, {})
                        response["gesture"] = gesture_def.get("name", gesture_key)
                        response["text"] = gesture_def.get("text", "")

                    await websocket.send_json(response)

            except json.JSONDecodeError:
                await websocket.send_json({
                    "type": "error",
                    "message": "JSON inválido",
                })
            except Exception as e:
                logger.error(f"Error procesando WebSocket: {e}")
                await websocket.send_json({
                    "type": "error",
                    "message": str(e),
                })

    except WebSocketDisconnect:
        manager.disconnect(websocket)


# ========================================
# MAIN
# ========================================

if __name__ == "__main__":
    import uvicorn

    print("""
    ╔═══════════════════════════════════════╗
    ║        SEÑAS CONNECT BACKEND          ║
    ║   API para reconocimiento de señas    ║
    ╚═══════════════════════════════════════╝
    """)

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )
