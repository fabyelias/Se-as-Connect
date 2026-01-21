# Señas Connect 🤝

**Aplicación de comunicación inclusiva en tiempo real entre personas sordomudas y oyentes.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

---

## 📋 Descripción

Señas Connect es una aplicación web que permite la comunicación bidireccional entre personas sordomudas y personas oyentes mediante:

1. **Reconocimiento de lengua de señas** → Detecta gestos con la cámara y los convierte en texto y audio
2. **Reconocimiento de voz** → Convierte el habla en texto visible para personas sordas

### Caso de uso principal

Un quiosquero apunta la cámara de su celular o computadora hacia una persona sordomuda:
- La persona hace señas → La app traduce a texto y audio
- El quiosquero habla → La app muestra el texto en pantalla grande

---

## ✨ Características

- ✅ Detección de manos en tiempo real con MediaPipe
- ✅ Reconocimiento de gestos y señas básicas
- ✅ Text-to-Speech (texto a audio) en español
- ✅ Speech-to-Text (voz a texto) en español
- ✅ Interfaz accesible con alto contraste
- ✅ Tamaño de texto ajustable
- ✅ Modo pantalla completa
- ✅ Funciona en computadoras y móviles
- ✅ No requiere instalación (funciona en el navegador)

---

## 🚀 Instalación y Ejecución

### Opción 1: Usando Python (Recomendado)

```bash
# 1. Navegar a la carpeta del proyecto
cd senas-connect

# 2. Ejecutar el servidor
python server.py
```

El navegador se abrirá automáticamente en `http://localhost:8080`

### Opción 2: Usando Node.js

```bash
# 1. Navegar a la carpeta del proyecto
cd senas-connect

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor
npm start
```

Abrir el navegador en `http://localhost:8080`

### Opción 3: Usando Visual Studio Code

1. Instalar la extensión **Live Server**
2. Hacer clic derecho en `index.html`
3. Seleccionar "Open with Live Server"

---

## 💻 Requisitos del Sistema

### Navegadores compatibles
- ✅ Google Chrome (recomendado)
- ✅ Microsoft Edge
- ✅ Firefox (soporte parcial para Speech-to-Text)
- ⚠️ Safari (soporte limitado)

### Hardware
- Cámara web o cámara del dispositivo móvil
- Micrófono (para reconocimiento de voz)
- Altavoces (para reproducción de audio)

---

## 📖 Guía de Uso

### Panel Izquierdo: Lengua de Señas → Texto/Audio

1. Presioná **"Iniciar Cámara"**
2. Permití el acceso a la cámara cuando el navegador lo solicite
3. Hacé señas frente a la cámara
4. El texto reconocido aparecerá en pantalla
5. Presioná **"Reproducir Audio"** para escuchar el mensaje

### Panel Derecho: Voz → Texto

1. Presioná **"Comenzar a Escuchar"**
2. Permití el acceso al micrófono
3. Hablá claramente
4. El texto aparecerá en pantalla grande para que la persona sorda pueda leerlo

### Gestos Reconocidos

| Gesto | Significado |
|-------|-------------|
| 🖐️ Mano abierta | Hola |
| 👍 Pulgar arriba | Bien / De acuerdo |
| 👎 Pulgar abajo | Mal / No está bien |
| ☝️ Señalar | Esto |
| ✌️ Dos dedos | 2 |
| 🤟 Tres dedos | 3 |
| ✋ Cuatro dedos | 4 |
| 🖐️ Cinco dedos | 5 |
| 👌 OK | OK / Perfecto |
| 🤙 Teléfono | Llamame |

---

## ♿ Accesibilidad

La aplicación incluye varias características de accesibilidad:

### Alto Contraste
- Presioná el botón **◐** en la esquina superior derecha
- O usá el atajo **Alt + C**

### Tamaño de Texto
- Presioná el botón **A+** para aumentar el tamaño
- O usá el atajo **Alt + F**
- Cicla entre: Normal → Grande → Muy Grande

### Pantalla Completa
- Presioná el botón **⛶** para modo pantalla completa
- O usá **Alt + Enter** o **F11**

### Feedback Visual
- Indicador verde cuando se detectan manos
- Animación cuando se reconoce un gesto
- Vibración en dispositivos móviles (si está disponible)

---

## 🔧 Configuración Avanzada

El archivo `js/config.js` contiene todas las configuraciones ajustables:

```javascript
// Ejemplo: Cambiar el idioma de voz
CONFIG.tts.language = 'es-ES';  // Español de España

// Ejemplo: Ajustar sensibilidad de detección
CONFIG.mediapipe.minDetectionConfidence = 0.8;

// Ejemplo: Desactivar auto-reproducción de audio
CONFIG.tts.autoSpeak = false;
```

---

## 🛠️ Estructura del Proyecto

```
senas-connect/
├── index.html              # Página principal
├── server.py               # Servidor de desarrollo Python
├── package.json            # Configuración npm
├── README.md               # Esta documentación
│
├── css/
│   ├── styles.css          # Estilos principales
│   └── accessibility.css   # Estilos de accesibilidad
│
├── js/
│   ├── config.js           # Configuración global
│   ├── sign-dictionary.js  # Diccionario de señas
│   ├── hand-detector.js    # Detección de manos (MediaPipe)
│   ├── sign-recognizer.js  # Reconocimiento de gestos
│   ├── speech-services.js  # TTS y STT
│   ├── accessibility.js    # Funciones de accesibilidad
│   └── app.js              # Aplicación principal
│
└── backend/                # Backend opcional (Python)
    ├── main.py             # API FastAPI
    └── requirements.txt    # Dependencias Python
```

---

## 🔬 Backend Avanzado (Opcional)

El backend Python proporciona procesamiento ML más avanzado:

### Instalación

```bash
# 1. Navegar a la carpeta del backend
cd backend

# 2. Crear entorno virtual (recomendado)
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Ejecutar
python main.py
```

El backend estará disponible en `http://localhost:8000`

### Documentación de la API
Visitar `http://localhost:8000/docs` para ver la documentación interactiva (Swagger).

---

## 📊 Agregar Nuevas Señas

### Método 1: Agregar gestos simples (solo posición de dedos)

Editar `js/sign-dictionary.js`:

```javascript
// En el objeto SimpleGestures, agregar:
mi_nueva_sena: {
    name: 'Mi Seña',
    text: 'El texto que se mostrará',
    pattern: {
        thumb: true,     // Pulgar extendido
        index: true,     // Índice extendido
        middle: false,   // Medio doblado
        ring: false,     // Anular doblado
        pinky: false,    // Meñique doblado
    },
    minConfidence: 0.85,  // Confianza mínima
},
```

### Método 2: Agregar señas complejas (con movimiento)

Para señas que requieren movimiento, se necesita entrenar un modelo de ML.
Ver la sección de "Mejoras Futuras" para más información.

---

## 🚧 Limitaciones Conocidas

1. **Diccionario limitado**: El sistema reconoce gestos básicos. Para LSA completa se requiere entrenamiento con datos reales.

2. **Iluminación**: Funciona mejor con buena iluminación.

3. **Velocidad de internet**: La primera carga puede ser lenta mientras se descargan los modelos de MediaPipe.

4. **Safari**: El reconocimiento de voz tiene soporte limitado en Safari/iOS.

5. **Movimiento**: Actualmente no se detectan señas con movimiento, solo posición estática.

---

## 🔮 Mejoras Futuras

1. **Entrenamiento con LSA real**
   - Recopilar dataset de Lengua de Señas Argentina
   - Entrenar modelo de clasificación con TensorFlow

2. **Detección de movimiento**
   - Implementar tracking temporal para detectar señas dinámicas

3. **Modo offline**
   - Service Worker para funcionamiento sin internet

4. **Múltiples idiomas**
   - Soporte para ASL (American Sign Language)
   - Soporte para otros idiomas de señas

5. **Aplicación móvil nativa**
   - Versión para Android (React Native o Flutter)
   - Versión para iOS

6. **Integración con IA generativa**
   - Uso de modelos de lenguaje para contexto
   - Predicción de palabras

---

## 🤝 Contribuir

Las contribuciones son bienvenidas:

1. Fork del repositorio
2. Crear rama de feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit de cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abrir Pull Request

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 🙏 Agradecimientos

- [MediaPipe](https://mediapipe.dev/) por las soluciones de detección de manos
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) para TTS y STT
- La comunidad sorda por inspirar este proyecto

---

## 📞 Contacto

Para reportar bugs, sugerencias o colaboraciones:
- Abrir un Issue en el repositorio
- Contactar al desarrollador

---

**Hecho con ❤️ para una comunicación más inclusiva**
