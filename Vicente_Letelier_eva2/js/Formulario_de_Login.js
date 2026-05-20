// Validaciones y helpers para el formulario de login

function validateLogin(email, password){
  const e = sanitizeInput(email);
  const p = String(password || '');
  if(!e || !p) return {valid:false, message:'Completa todos los campos.'};
  if(!validateEmail(e)) return {valid:false, message:'Ingresa un email válido.'};
  if(!validatePassword(p)) return {valid:false, message:'La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número.'};
  return {valid:true, message:''};
}

function showLoginSuccess(msgEl){
  if(msgEl){
    msgEl.textContent = '¡Bienvenido de vuelta!';
    msgEl.style.color = 'var(--cyan)';
  }
  if(typeof toast === 'function') toast('Sesión iniciada correctamente ✓');
  const overlay = document.getElementById('overlay');
  if(overlay){
    overlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

function validateContact(name, email, message){
  const errors = {};
  if(!String(name||'').trim()) errors.name = 'Completa tu nombre.';
  if(!validateEmail(email)) errors.email = 'Ingresa un email válido.';
  if(String(message||'').trim().length < 10) errors.message = 'El mensaje debe tener al menos 10 caracteres.';
  return {valid: Object.keys(errors).length === 0, errors};
}

window.validateLogin     = validateLogin;
window.validateContact   = validateContact;
window.showLoginSuccess  = showLoginSuccess;

// Abrir/cerrar modal de login
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('openLogin');
  const closeBtn = document.getElementById('closeLogin');
  const overlay  = document.getElementById('overlay');

  if(openBtn && overlay){
    openBtn.addEventListener('click', () => {
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  }
  if(closeBtn && overlay){
    closeBtn.addEventListener('click', () => {
      overlay.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });
  }
  if(overlay){
    overlay.addEventListener('click', e => {
      if(e.target === overlay){
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    });
  }
});