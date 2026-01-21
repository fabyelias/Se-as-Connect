"""
SEÑAS CONNECT - Servidor de Desarrollo Simple

Este script inicia un servidor HTTP simple para servir los archivos
del frontend. Es la forma más fácil de probar la aplicación localmente.

Uso:
    python server.py

Luego abrí tu navegador en: http://localhost:8080
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Agregar headers necesarios para cámara y micrófono
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        super().end_headers()


def main():
    print("""
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║                    SEÑAS CONNECT                          ║
    ║           Comunicación Inclusiva para Todos               ║
    ║                                                           ║
    ╠═══════════════════════════════════════════════════════════╣
    ║                                                           ║
    ║   Servidor iniciado en: http://localhost:8080             ║
    ║                                                           ║
    ║   Presioná Ctrl+C para detener el servidor                ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
    """)

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        # Abrir navegador automáticamente
        webbrowser.open(f'http://localhost:{PORT}')

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nServidor detenido. ¡Hasta pronto!")


if __name__ == "__main__":
    main()
