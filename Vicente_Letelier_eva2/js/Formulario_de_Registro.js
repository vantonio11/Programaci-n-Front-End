// Formulario_de_Registro.js
// Solo define funciones de validación base

function sanitizeInput(value){
  return String(value || '').trim().replace(/[<>]/g, c => c === '<' ? '&lt;' : '&gt;');
}

function validateEmail(email){
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).trim());
}

function validatePassword(pass){
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return typeof pass === 'string' && passwordRegex.test(pass);
}

function passwordsMatch(p1, p2){
  return p1 === p2;
}

function validateRegistration(name, email, password, confirmPassword){
  const errors = {};
  if(!String(name||'').trim())     errors.name     = 'Completa tu nombre.';
  if(!validateEmail(email))        errors.email    = 'Ingresa un email válido.';
  if(!validatePassword(password))  errors.password = 'La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número.';
  if(password !== confirmPassword) errors.confirm  = 'Las contraseñas no coinciden.';
  return { valid: Object.keys(errors).length === 0, errors };
}

// validarDatos NO se declara aquí — la versión final estara en main.js

window.sanitizeInput        = sanitizeInput;
window.validateEmail        = validateEmail;
window.validatePassword     = validatePassword;
window.passwordsMatch       = passwordsMatch;
window.validateRegistration = validateRegistration;
