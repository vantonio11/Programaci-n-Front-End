/**
 * MÓDULO: HELPERS PARA FORMULARIOS DE CONTACTO
 * Nota: La lógica principal de manejo de eventos está en main.js
 * Este archivo proporciona funciones auxiliares
 */

/**
 * Limpia los mensajes de error de un formulario
 * @param {string} formId - ID del formulario a limpiar
 */
function limpiarErrores(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  // Encontrar todos los elementos con clase field-error y limpiar su contenido
  form.querySelectorAll('.field-error').forEach(el => {
    el.textContent = '';
  });
}

/**
 * Muestra un mensaje de error en un campo específico
 * @param {string} inputId - ID del elemento de error
 * @param {string} msg - Mensaje a mostrar
 */
function mostrarError(inputId, msg) {
  const el = document.getElementById(inputId);
  if (el) {
    el.textContent = msg;
  }
}

/**
 * Alias para mostrarError (para compatibilidad)
 */
function showFieldError(inputId, msg) {
  mostrarError(inputId, msg);
}

/**
 * Alias para limpiarErrores (para compatibilidad)
 */
function clearFieldErrors(formId) {
  limpiarErrores(formId);
}

/**
 * Muestra un mensaje en un elemento específico con color
 * @param {string} elementId - ID del elemento
 * @param {string} msg - Mensaje a mostrar
 * @param {boolean} isError - Si es true, colorea en rojo; si false, en cyan
 */
function showFormMessage(elementId, msg, isError) {
  const el = document.getElementById(elementId);
  if (!el) return;

  el.textContent = msg;
  el.style.color = isError ? '#ff6b6b' : 'var(--cyan)';
}

/**
 * ========================================
 * EXPOSICIÓN AL SCOPE GLOBAL (window)
 * ========================================
 */
window.limpiarErrores = limpiarErrores;
window.mostrarError = mostrarError;
window.showFieldError = showFieldError;
window.clearFieldErrors = clearFieldErrors;
window.showFormMessage = showFormMessage;
