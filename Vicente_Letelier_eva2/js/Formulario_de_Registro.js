/**
 * MÓDULO: VALIDACIONES Y UTILIDADES
 * Contiene funciones base de sanitización y validación
 * para formularios de registro, login y contacto
 */

/**
 * Sanitiza entrada de usuario removiendo caracteres peligrosos
 * @param {*} value - Valor a sanitizar
 * @returns {string} - String sanitizado
 */
function sanitizeInput(value) {
  return String(value || '')
    .trim()
    .replace(/[<>]/g, char => char === '<' ? '&lt;' : '&gt;');
}

/**
 * Valida formato de email
 * Verifica que tenga estructura básica: algo@algo.algo
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email || '').trim());
}

/**
 * Valida que la contraseña cumpla requisitos mínimos
 * Requisitos: mínimo 8 caracteres, al menos una mayúscula y un número
 * @param {string} password - Contraseña a validar
 * @returns {boolean} - True si es válida
 */
function validatePassword(password) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return typeof password === 'string' && passwordRegex.test(password);
}

/**
 * Verifica que dos contraseñas coincidan
 * @param {string} p1 - Primera contraseña
 * @param {string} p2 - Segunda contraseña
 * @returns {boolean} - True si coinciden
 */
function passwordsMatch(p1, p2) {
  return String(p1 || '') === String(p2 || '');
}

/**
 * Valida datos de registro del usuario
 * @param {string} name - Nombre del usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña
 * @param {string} confirmPassword - Confirmación de contraseña
 * @returns {Object} - {valid: boolean, errors: Object con mensajes de error}
 */
function validateRegistration(name, email, password, confirmPassword) {
  const errors = {};

  // Validar nombre (debe no estar vacío)
  if (!String(name || '').trim()) {
    errors.name = 'Completa tu nombre.';
  }

  // Validar email
  if (!validateEmail(email)) {
    errors.email = 'Ingresa un email válido.';
  }

  // Validar contraseña
  if (!validatePassword(password)) {
    errors.password = 'La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número.';
  }

  // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
    errors.confirm = 'Las contraseñas no coinciden.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Valida datos generales de formularios (contacto, login, etc)
 * @param {Object} formData - Datos del formulario con campos opcionales
 * @returns {Object} - {valid: boolean, errores: Array de objetos con {campo, msg}}
 */
function validarDatos(formData) {
  const errores = [];
  const texto = value => String(value || '').trim();

  // Validar nombre
  if ('nombre' in formData && !texto(formData.nombre)) {
    errores.push({
      campo: 'nombre',
      msg: 'Completa tu nombre.'
    });
  }

  // Validar email
  if ('email' in formData && !validateEmail(formData.email)) {
    errores.push({
      campo: 'email',
      msg: 'Ingresa un email válido.'
    });
  }

  // Validar contraseña
  if ('password' in formData && !validatePassword(formData.password)) {
    errores.push({
      campo: 'password',
      msg: 'La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número.'
    });
  }

  // Validar confirmación de contraseña
  if ('confirmPassword' in formData && formData.password !== formData.confirmPassword) {
    errores.push({
      campo: 'confirmPassword',
      msg: 'Las contraseñas no coinciden.'
    });
  }

  // Validar mensaje (para formularios de contacto)
  if ('message' in formData && texto(formData.message).length < 10) {
    errores.push({
      campo: 'message',
      msg: 'El mensaje debe tener al menos 10 caracteres.'
    });
  }

  return {
    valid: errores.length === 0,
    errores
  };
}

/**
 * ========================================
 * EXPOSICIÓN AL SCOPE GLOBAL (window)
 * Permite usar estas funciones en HTML inline
 * ========================================
 */
window.sanitizeInput = sanitizeInput;
window.validateEmail = validateEmail;
window.validatePassword = validatePassword;
window.passwordsMatch = passwordsMatch;
window.validateRegistration = validateRegistration;
window.validarDatos = validarDatos;