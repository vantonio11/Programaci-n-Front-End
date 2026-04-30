// Validaciones y helpers para el formulario de login
function validateLogin(email, password){
  const e = String(email || '').trim();
  const p = String(password || '');
  if(!e || !p) return {valid:false, message:'Completa todos los campos.'};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(e)) return {valid:false, message:'Ingresa un email válido.'};
  if(p.length < 8) return {valid:false, message:'La contraseña debe tener al menos 8 caracteres.'};
  return {valid:true, message:''};
}

function showLoginSuccess(msgEl){
  if(msgEl){
    msgEl.textContent = '¡Bienvenido de vuelta!';
    msgEl.style.color = 'var(--cyan)';
  }
  if(typeof toast === 'function') toast('Sesión iniciada correctamente ✓');
  // Cerrar overlay modal si existe
  const overlay = document.getElementById('overlay');
  if(overlay){
    overlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

window.validateLogin = validateLogin;
window.showLoginSuccess = showLoginSuccess;

// Listeners para abrir/cerrar el modal de login (si los elementos existen)
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('openLogin');
  const closeBtn = document.getElementById('closeLogin');
  const overlay = document.getElementById('overlay');

  if (openBtn && overlay) {
    openBtn.addEventListener('click', () => {
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    });
  }
});
