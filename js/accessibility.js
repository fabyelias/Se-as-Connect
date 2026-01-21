/**
 * SEÑAS CONNECT - Módulo de Accesibilidad
 *
 * Maneja todas las funcionalidades de accesibilidad:
 * - Alto contraste
 * - Tamaño de fuente
 * - Modo pantalla completa
 * - Feedback visual/auditivo
 * - Persistencia de preferencias
 */

class AccessibilityManager {
    constructor() {
        // Estado actual
        this.state = {
            highContrast: false,
            fontSize: 'normal', // 'normal', 'large', 'xlarge'
            fullscreen: false,
            reducedMotion: false,
        };

        // Clases CSS correspondientes
        this.cssClasses = {
            highContrast: 'high-contrast',
            fontSizes: {
                normal: '',
                large: 'font-large',
                xlarge: 'font-xlarge',
            },
            fullscreen: 'fullscreen-mode',
        };

        this.init();
    }

    /**
     * Inicializa el módulo de accesibilidad
     */
    init() {
        // Cargar preferencias guardadas
        this.loadPreferences();

        // Detectar preferencia del sistema para reducir movimiento
        this.detectReducedMotion();

        // Aplicar estado inicial
        this.applyState();

        // Configurar listeners
        this.setupEventListeners();

        this.log('Módulo de accesibilidad inicializado');
    }

    /**
     * Carga preferencias guardadas del localStorage
     */
    loadPreferences() {
        if (!CONFIG.ui.savePreferences) return;

        try {
            const saved = localStorage.getItem('senasconnect_accessibility');
            if (saved) {
                const prefs = JSON.parse(saved);
                this.state = { ...this.state, ...prefs };
                this.log('Preferencias cargadas:', this.state);
            }
        } catch (error) {
            console.error('[Accessibility] Error cargando preferencias:', error);
        }
    }

    /**
     * Guarda preferencias en localStorage
     */
    savePreferences() {
        if (!CONFIG.ui.savePreferences) return;

        try {
            localStorage.setItem(
                'senasconnect_accessibility',
                JSON.stringify(this.state)
            );
            this.log('Preferencias guardadas');
        } catch (error) {
            console.error('[Accessibility] Error guardando preferencias:', error);
        }
    }

    /**
     * Detecta si el usuario prefiere movimiento reducido
     */
    detectReducedMotion() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.state.reducedMotion = mediaQuery.matches;

        mediaQuery.addEventListener('change', (e) => {
            this.state.reducedMotion = e.matches;
            this.log('Preferencia de movimiento reducido:', this.state.reducedMotion);
        });
    }

    /**
     * Aplica el estado actual al DOM
     */
    applyState() {
        const body = document.body;

        // Alto contraste
        body.classList.toggle(this.cssClasses.highContrast, this.state.highContrast);

        // Tamaño de fuente
        Object.values(this.cssClasses.fontSizes).forEach((cls) => {
            if (cls) body.classList.remove(cls);
        });
        const fontClass = this.cssClasses.fontSizes[this.state.fontSize];
        if (fontClass) body.classList.add(fontClass);

        // Pantalla completa
        body.classList.toggle(this.cssClasses.fullscreen, this.state.fullscreen);

        this.log('Estado aplicado:', this.state);
    }

    /**
     * Configura los event listeners para los controles
     */
    setupEventListeners() {
        // Botón de alto contraste
        const btnContrast = document.getElementById('btn-contrast');
        if (btnContrast) {
            btnContrast.addEventListener('click', () => this.toggleHighContrast());
        }

        // Botón de tamaño de fuente
        const btnFontSize = document.getElementById('btn-font-size');
        if (btnFontSize) {
            btnFontSize.addEventListener('click', () => this.cycleFontSize());
        }

        // Botón de pantalla completa
        const btnFullscreen = document.getElementById('btn-fullscreen');
        if (btnFullscreen) {
            btnFullscreen.addEventListener('click', () => this.toggleFullscreen());
        }

        // Escuchar cambio de pantalla completa
        document.addEventListener('fullscreenchange', () => {
            this.state.fullscreen = !!document.fullscreenElement;
            this.applyState();
        });

        // Atajos de teclado
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    /**
     * Maneja atajos de teclado
     */
    handleKeyboard(event) {
        // Alt + C: Alto contraste
        if (event.altKey && event.key === 'c') {
            event.preventDefault();
            this.toggleHighContrast();
        }

        // Alt + F: Aumentar fuente
        if (event.altKey && event.key === 'f') {
            event.preventDefault();
            this.cycleFontSize();
        }

        // Alt + Enter o F11: Pantalla completa
        if ((event.altKey && event.key === 'Enter') || event.key === 'F11') {
            event.preventDefault();
            this.toggleFullscreen();
        }

        // Escape: Salir de pantalla completa
        if (event.key === 'Escape' && this.state.fullscreen) {
            this.toggleFullscreen();
        }
    }

    /**
     * Alterna el modo de alto contraste
     */
    toggleHighContrast() {
        this.state.highContrast = !this.state.highContrast;
        this.applyState();
        this.savePreferences();

        this.showStatus(
            this.state.highContrast ? 'Alto contraste activado' : 'Alto contraste desactivado'
        );

        this.announce(
            this.state.highContrast ? 'Modo alto contraste activado' : 'Modo alto contraste desactivado'
        );
    }

    /**
     * Cicla entre tamaños de fuente
     */
    cycleFontSize() {
        const sizes = ['normal', 'large', 'xlarge'];
        const currentIndex = sizes.indexOf(this.state.fontSize);
        const nextIndex = (currentIndex + 1) % sizes.length;

        this.state.fontSize = sizes[nextIndex];
        this.applyState();
        this.savePreferences();

        const sizeNames = {
            normal: 'Normal',
            large: 'Grande',
            xlarge: 'Muy grande',
        };

        this.showStatus(`Tamaño de texto: ${sizeNames[this.state.fontSize]}`);
        this.announce(`Tamaño de texto ${sizeNames[this.state.fontSize]}`);
    }

    /**
     * Alterna pantalla completa
     */
    async toggleFullscreen() {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
                this.state.fullscreen = true;
            } else {
                await document.exitFullscreen();
                this.state.fullscreen = false;
            }
            this.applyState();
        } catch (error) {
            console.error('[Accessibility] Error con pantalla completa:', error);
        }
    }

    /**
     * Muestra un mensaje de estado temporal
     */
    showStatus(message, type = 'info') {
        // Crear o reutilizar elemento de estado
        let statusEl = document.querySelector('.status-message');

        if (!statusEl) {
            statusEl = document.createElement('div');
            statusEl.className = 'status-message';
            document.body.appendChild(statusEl);
        }

        statusEl.textContent = message;
        statusEl.className = `status-message ${type}`;

        // Mostrar
        setTimeout(() => statusEl.classList.add('visible'), 10);

        // Ocultar después del tiempo configurado
        setTimeout(() => {
            statusEl.classList.remove('visible');
        }, CONFIG.ui.statusMessageDuration);
    }

    /**
     * Anuncia un mensaje para lectores de pantalla
     */
    announce(message, priority = 'polite') {
        // Usar aria-live region
        let announcer = document.getElementById('accessibility-announcer');

        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'accessibility-announcer';
            announcer.setAttribute('aria-live', priority);
            announcer.setAttribute('aria-atomic', 'true');
            announcer.className = 'visually-hidden';
            document.body.appendChild(announcer);
        }

        // Limpiar y agregar nuevo mensaje
        announcer.textContent = '';
        setTimeout(() => {
            announcer.textContent = message;
        }, 100);
    }

    /**
     * Feedback visual para detección de manos
     */
    showHandsDetected(detected) {
        const indicator = document.getElementById('indicator-hands');
        const container = document.querySelector('.camera-container');

        if (indicator) {
            indicator.classList.toggle('active', detected);
        }

        if (container) {
            container.classList.toggle('hands-detected', detected);
        }

        // Vibración en móviles (si está habilitado y soportado)
        if (detected && CONFIG.ui.enableVibration && navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    /**
     * Feedback visual para gesto reconocido
     */
    showGestureRecognized(gesture) {
        const indicator = document.getElementById('indicator-gesture');
        const container = document.querySelector('.camera-container');
        const outputText = document.getElementById('output-text');

        if (indicator) {
            indicator.classList.add('active');
            setTimeout(() => indicator.classList.remove('active'), 1000);
        }

        if (container) {
            container.classList.add('gesture-recognized');
            setTimeout(() => container.classList.remove('gesture-recognized'), 500);
        }

        if (outputText) {
            outputText.classList.add('new-text');
            setTimeout(() => outputText.classList.remove('new-text'), 500);
        }

        // Vibración más larga para gesto reconocido
        if (CONFIG.ui.enableVibration && navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }

        // Anunciar para lectores de pantalla
        this.announce(`Gesto reconocido: ${gesture.name}`, 'assertive');
    }

    /**
     * Feedback visual para grabación de voz
     */
    showRecording(isRecording) {
        const indicator = document.getElementById('recording-indicator');

        if (indicator) {
            indicator.classList.toggle('hidden', !isRecording);
        }

        if (isRecording) {
            this.announce('Grabando voz', 'assertive');
        }
    }

    /**
     * Logger
     */
    log(message, data = null) {
        if (CONFIG.debug.enableLogs) {
            if (data) {
                console.log(`[Accessibility] ${message}`, data);
            } else {
                console.log(`[Accessibility] ${message}`);
            }
        }
    }
}

// ========================================
// UTILIDADES DE ACCESIBILIDAD
// ========================================

const A11yUtils = {
    /**
     * Establece el foco en un elemento de forma accesible
     */
    focusElement(element, options = {}) {
        if (!element) return;

        // Hacer el elemento focusable si no lo es
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '-1');
        }

        // Establecer foco
        element.focus(options);

        // Scroll suave si es necesario
        if (options.scrollIntoView !== false) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    },

    /**
     * Atrapa el foco dentro de un elemento (para modales)
     */
    trapFocus(container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        container.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        });

        // Establecer foco inicial
        firstElement?.focus();
    },

    /**
     * Genera un ID único para aria-labelledby/describedby
     */
    generateId(prefix = 'a11y') {
        return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Verifica si el usuario prefiere movimiento reducido
     */
    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    /**
     * Verifica si el usuario prefiere alto contraste
     */
    prefersHighContrast() {
        return window.matchMedia('(prefers-contrast: more)').matches;
    },
};

// Instancia global
let accessibilityManager = null;
