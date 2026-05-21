/**
 * MÓDULO: VALIDACIÓN Y MANEJO DE LOGIN
 * Contiene funciones para validar datos de login
 * y gestionar el modal de autenticación
 */

/**
 * Valida datos de login
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Object} - {valid: boolean, message: string}
 */
function validateLogin(email, password) {
  const e = sanitizeInput(email);
  const p = String(password || '');

  // Verificar que ambos campos estén completos
  if (!e || !p) {
    return {
      valid: false,
      message: 'Completa todos los campos.'
    };
  }

  // Validar formato de email
  if (!validateEmail(e)) {
    return {
      valid: false,
      message: 'Ingresa un email válido.'
    };
  }

  // Validar requisitos de contraseña
  if (!validatePassword(p)) {
    return {
      valid: false,
      message: 'La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número.'
    };
  }

  return {
    valid: true,
    message: ''
  };
}

/**
 * Valida datos de contacto
 * @param {string} name - Nombre del usuario
 * @param {string} email - Email del usuario
 * @param {string} message - Mensaje del contacto
 * @returns {Object} - {valid: boolean, errors: Object}
 */
function validateContact(name, email, message) {
  const errors = {};

  // Validar nombre
  if (!String(name || '').trim()) {
    errors.name = 'Completa tu nombre.';
  }

  // Validar email
  if (!validateEmail(email)) {
    errors.email = 'Ingresa un email válido.';
  }

  // Validar mensaje (mínimo 10 caracteres)
  if (String(message || '').trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Muestra mensaje de éxito al iniciar sesión
 * @param {HTMLElement} msgEl - Elemento donde mostrar el mensaje
 */
function showLoginSuccess(msgEl) {
  if (msgEl) {
    msgEl.textContent = '¡Bienvenido de vuelta!';
    msgEl.style.color = 'var(--cyan)';
  }

  // Mostrar notificación toast si existe
  if (typeof toast === 'function') {
    toast('Sesión iniciada correctamente ✓');
  }

  // Cerrar el modal de login
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

/**
 * ========================================
 * GESTIÓN DEL MODAL DE LOGIN
 * Abre/cierra el modal y maneja eventos
 * ========================================
 */
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('openLogin');
  const closeBtn = document.getElementById('closeLogin');
  const overlay = document.getElementById('overlay');

  /**
   * Abrir modal de login
   */
  if (openBtn && overlay) {
    openBtn.addEventListener('click', () => {
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  }

  /**
   * Cerrar modal al hacer clic en botón X
   */
  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });
  }

  /**
   * Cerrar modal al hacer clic fuera del contenido
   */
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    });
  }
});

/**
 * ========================================
 * EXPOSICIÓN AL SCOPE GLOBAL (window)
 * ========================================
 */
window.validateLogin = validateLogin;
window.validateContact = validateContact;
window.showLoginSuccess = showLoginSuccess;