
from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import os

# Crear la aplicación de Flask
app = Flask(__name__)
# Permitir solicitudes de cualquier origen
CORS(app)

# Ruta al archivo donde guardaremos los datos
DATA_FILE = 'collected_data.csv'

# Definir la ruta para recibir los datos de la mano para predicción
@app.route('/predict', methods=['POST'])
def predict():
    # Obtener los datos de los landmarks de la mano
    data = request.get_json()
    landmarks = data['landmarks']
    
    # Aquí es donde irá la lógica del modelo de Machine Learning.
    # Por ahora, simplemente devolveremos un resultado de ejemplo.
    prediction = "Letra A (predicción de ejemplo)"

    # Devolver la predicción en formato JSON
    return jsonify({'prediction': prediction})

# Definir la ruta para grabar muestras de entrenamiento
@app.route('/record', methods=['POST'])
def record():
    try:
        # Obtener los datos de la seña
        data = request.get_json()
        label = data.get('label')
        landmarks = data.get('landmarks')

        if not label or not landmarks:
            return jsonify({'status': 'error', 'message': 'Faltan datos (label o landmarks)'}), 400

        # Aplanar los landmarks en una sola lista de coordenadas
        # Cada landmark tiene {x, y, z}, queremos [x1, y1, z1, x2, y2, z2, ...]
        flat_landmarks = [coord for lm in landmarks for coord in (lm['x'], lm['y'], lm['z'])]

        # Preparar la fila para el CSV
        row = [label] + flat_landmarks

        # Verificar si el archivo necesita encabezado
        file_exists = os.path.isfile(DATA_FILE)

        # Escribir en el archivo CSV
        with open(DATA_FILE, mode='a', newline='') as f:
            writer = csv.writer(f)

            # Escribir el encabezado si el archivo es nuevo
            if not file_exists:
                header = ['label']
                for i in range(len(landmarks)):
                    header.extend([f'x{i}', f'y{i}', f'z{i}'])
                writer.writerow(header)
            
            # Escribir la fila de datos
            writer.writerow(row)

        return jsonify({'status': 'success', 'message': f'Muestra para \'{label}\' guardada'})

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Iniciar el servidor
if __name__ == '__main__':
    # Escuchar en todas las interfaces de red en el puerto 5000
    app.run(host='0.0.0.0', port=5000)
