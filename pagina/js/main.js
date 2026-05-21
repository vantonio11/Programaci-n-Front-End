/**
 * ========================================
 * APLICACIÓN E-COMMERCE: VICELETECHILE
 * Gestión de estado, carrito y lógica de negocio
 * ========================================
 */

// ==========================================
// 1. VARIABLES GLOBALES Y ESTADO
// ==========================================

const usuarios = [];
const sesion = { activo: false, usuario: null };

// Claves para LocalStorage
const STORAGE_KEY = 'luxe_usuarios_v1';
const SESSION_KEY = 'luxe_sesion_v1';

/**
 * Carga el estado guardado desde LocalStorage
 * Restaura usuarios y sesión activa
 */
const loadState = () => {
  try {
    const u = localStorage.getItem(STORAGE_KEY);
    const s = localStorage.getItem(SESSION_KEY);

    // Cargar usuarios
    if (u) {
      const parsed = JSON.parse(u);
      if (Array.isArray(parsed)) {
        usuarios.length = 0;
        parsed.forEach(x => usuarios.push(x));
      }
    }

    // Cargar sesión
    if (s) {
      const parsedS = JSON.parse(s);
      if (parsedS && typeof parsedS === 'object') {
        sesion.activo = !!parsedS.activo;
        sesion.usuario = parsedS.usuario || null;
      }
    }
  } catch (e) {
    console.warn('No se pudo cargar estado:', e);
  }
};

/**
 * Guarda el estado actual en LocalStorage
 */
const saveState = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
    localStorage.setItem(SESSION_KEY, JSON.stringify(sesion));
  } catch (e) {
    console.warn('No se pudo guardar estado:', e);
  }
};

// ==========================================
// 2. CATÁLOGO DE PRODUCTOS
// ==========================================

const PRODUCTS = [
  { id: 1, name: 'Chaqueta Cuero Biker', cat: 'Casual', price: 250000, img: './imagenes/chaquetas/cahqueta1.png', badge: 'Bestseller', isNew: false },
  { id: 2, name: 'Chaqueta Bomber Neon', cat: 'Casual', price: 200000, img: './imagenes/chaquetas/chaqueta2.jpg', badge: '', isNew: true },
  { id: 3, name: 'Chaqueta Tron Edition', cat: 'Deportiva', price: 225000, img: './imagenes/chaquetas/chaqueta3.jpg', badge: 'Exclusivo', isNew: true },
  { id: 4, name: 'Traje Doble Botonadura', cat: 'Formal', price: 5000000, img: './imagenes/trajes/traje1.jpg', badge: 'Premium', isNew: false },
  { id: 5, name: 'Zapatillas Classic Sport', cat: 'Casual', price: 200000, img: './imagenes/zapatillas/zapa1.jpg', badge: '', isNew: false },
  { id: 6, name: 'Zapatillas NZXT Gaming', cat: 'Deportiva', price: 500000, img: './imagenes/zapatillas/zapa2.jpg', badge: 'Exclusivo', isNew: true },
  { id: 7, name: 'Zapatillas White Runner', cat: 'Deportiva', price: 225000, img: './imagenes/zapatillas/zapa3.jpg', badge: '', isNew: false },
  { id: 8, name: 'Zapatillas Neon Sport', cat: 'Deportiva', price: 250000, img: './imagenes/zapatillas/zapa4.jpg', badge: '', isNew: true },
  { id: 9, name: 'Nike Mag Future Luxe', cat: 'Lujo', price: 2000000, img: './imagenes/zapatillas/zapa5.jpg', badge: 'Exclusivo', isNew: false }
];

// ==========================================
// 3. ESTADO DE CARRITO Y FAVORITOS
// ==========================================

let cart = [];
let favs = new Set();
let filtered = [...PRODUCTS];

// ==========================================
// 4. CONTROL DE CARRUSEL DE CATEGORÍAS
// ==========================================

let categoryIndex = 0;
let categoryCards = [];
let carouselInterval = null;
let carouselProgressTimer = null;
const carouselDuration = 5000;
const carouselTick = 40;

// ==========================================
// 5. FUNCIONES UTILITARIAS
// ==========================================

/**
 * Formatea un número como precio en CLP
 * @param {number} n - Número a formatear
 * @returns {string} - Precio formateado: $X.XXX CLP
 */
const fmtPrice = n => '$' + n.toLocaleString('es-CL') + ' CLP';

// ==========================================
// 6. GESTIÓN DE USUARIOS (AUTENTICACIÓN)
// ==========================================

/**
 * Registra un nuevo usuario
 * @param {Object} datos - {nombre, email, password}
 * @returns {Object} - Objeto usuario creado
 */
const registrarUsuario = datos => {
  const usuario = {
    id: Date.now(),
    nombre: String(datos.nombre || '').trim(),
    email: String(datos.email || '').trim().toLowerCase(),
    password: String(datos.password || ''),
    fechaRegistro: new Date().toISOString(),
    rol: 'user'
  };
  usuarios.push(usuario);
  saveState();
  return usuario;
};

/**
 * Inicia sesión con email y contraseña
 * @param {string} email - Email del usuario
 * @param {string} pass - Contraseña del usuario
 * @returns {Object} - {success: boolean, usuario: Object, mensaje: string}
 */
const iniciarSesion = (email, pass) => {
  const usuario = usuarios.find(
    u => u.email === String(email || '').trim().toLowerCase() && u.password === String(pass || '')
  );

  if (!usuario) {
    return {
      success: false,
      mensaje: 'Email o contraseña incorrectos.'
    };
  }

  sesion.activo = true;
  sesion.usuario = usuario;
  saveState();

  return {
    success: true,
    usuario
  };
};

/**
 * Cierra la sesión del usuario actual
 */
const cerrarSesion = () => {
  sesion.activo = false;
  sesion.usuario = null;
  saveState();
  actualizarDOM('perfil');
};
  saveState();
  actualizarDOM('perfil');
};

// ==========================================
// 7. RENDERIZADO DE PRODUCTOS
// ==========================================

/**
 * Renderiza productos en la cuadrícula
 * @param {Array} list - Lista de productos a renderizar
 */
const renderProducts = list => {
  const grid = document.getElementById('prodGrid');
  if (!grid) return console.warn('renderProducts: no se encontró #prodGrid');

  grid.style.display = 'grid';
  grid.dataset.rendered = 'true';

  if (!list.length) {
    grid.innerHTML = '<p style="color:var(--gray);grid-column:1/-1;text-align:center;padding:40px">No hay productos en esta categoría.</p>';
    return;
  }

  grid.innerHTML = list.map(p => `
    <div class="prod-card">
      <div class="prod-img-wrap">
        <img class="prod-img" src="${p.img}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<span class="prod-badge${p.isNew ? ' new' : ''}">${p.badge}</span>` : ''}
        ${p.isNew && !p.badge ? '<span class="prod-badge new">Nuevo</span>' : ''}
        <button class="prod-fav${favs.has(p.id) ? ' active' : ''}" onclick="toggleFav(${p.id}, this)">♥</button>
      </div>
      <div class="prod-info">
        <div class="prod-cat">${p.cat}</div>
        <div class="prod-name">${p.name}</div>
        <div class="prod-bottom">
          <div><span class="prod-price">${fmtPrice(p.price)}</span></div>
          <button class="btn-add" onclick="addToCart(${p.id})">+ Agregar</button>
        </div>
      </div>
    </div>
  `).join('');
};

/**
 * Filtra productos por categoría
 * @param {string} cat - Categoría a filtrar
 * @param {HTMLElement} btn - Botón de filtro (opcional)
 */
const filterProducts = (cat, btn) => {
  if (btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  filtered = cat === 'Todos' ? [...PRODUCTS] : PRODUCTS.filter(p => p.cat === cat);
  renderProducts(filtered);

  // Scroll suave a la sección de productos
  document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// ==========================================
// 8. CARRUSEL DE CATEGORÍAS
// ==========================================

/**
 * Inicializa el carrusel de categorías
 */
const initCategoryCarousel = () => {
  categoryCards = Array.from(document.querySelectorAll('#catGrid .cat-card'));
  categoryCards.forEach((card, index) => {
    card.dataset.catIndex = index;
    card.classList.toggle('active', index === categoryIndex);
    card.classList.toggle('hidden', index !== categoryIndex);
  });
  startCarouselAuto();
};

/**
 * Avanza a la siguiente categoría en el carrusel
 */
window.prevCategory = () => setCategorySlide(categoryIndex - 1);

/**
 * Retrocede a la categoría anterior
 */
window.nextCategory = () => setCategorySlide(categoryIndex + 1);

/**
 * Establece la diapositiva actual del carrusel
 * @param {number} index - Índice de la diapositiva
 */
const setCategorySlide = index => {
  const count = categoryCards.length;
  if (!count) return;

  categoryIndex = (index + count) % count;
  categoryCards.forEach((card, i) => {
    card.classList.toggle('active', i === categoryIndex);
    card.classList.toggle('hidden', i !== categoryIndex);
  });

  resetCarouselTimer();
};

/**
 * Inicia rotación automática del carrusel
 */
const startCarouselAuto = () => {
  stopCarouselAuto();
  updateCarouselProgress(0);
  carouselInterval = window.setInterval(() => setCategorySlide(categoryIndex + 1), carouselDuration);
  startCarouselProgress();
};

/**
 * Detiene la rotación automática
 */
const stopCarouselAuto = () => {
  if (carouselInterval) {
    window.clearInterval(carouselInterval);
    carouselInterval = null;
  }
  if (carouselProgressTimer) {
    window.clearInterval(carouselProgressTimer);
    carouselProgressTimer = null;
  }
};

/**
 * Reinicia el timer del carrusel
 */
const resetCarouselTimer = () => startCarouselAuto();

/**
 * Inicia la animación de progreso del carrusel
 */
const startCarouselProgress = () => {
  const progress = document.getElementById('carouselProgress');
  if (!progress) return;

  let elapsed = 0;
  updateCarouselProgress(0);

  if (carouselProgressTimer) window.clearInterval(carouselProgressTimer);

  carouselProgressTimer = window.setInterval(() => {
    elapsed += carouselTick;
    const percent = Math.min(100, (elapsed / carouselDuration) * 100);
    updateCarouselProgress(percent);

    if (percent >= 100) elapsed = 0;
  }, carouselTick);
};

/**
 * Actualiza el ancho de la barra de progreso
 * @param {number} value - Porcentaje (0-100)
 */
const updateCarouselProgress = value => {
  const progress = document.getElementById('carouselProgress');
  if (progress) progress.style.width = `${value}%`;
};

// ==========================================
// 9. ORDENAMIENTO, FAVORITOS Y CARRITO
// ==========================================

/**
 * Ordena productos por precio o novedad
 * @param {string} v - Criterio: 'asc', 'desc', 'new'
 */
window.sortProducts = v => {
  if (!v) return;

  const sorted = [...filtered];

  if (v === 'asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (v === 'desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (v === 'new') {
    sorted.sort((a, b) => b.isNew - a.isNew);
  }

  renderProducts(sorted);
};

/**
 * Alterna producto entre favoritos y no favoritos
 * @param {number} id - ID del producto
 * @param {HTMLElement} btn - Botón de favorito
 */
const toggleFav = (id, btn) => {
  if (favs.has(id)) {
    favs.delete(id);
    btn.classList.remove('active');
  } else {
    favs.add(id);
    btn.classList.add('active');
    toast('Agregado a favoritos ♥');
  }
};

/**
 * Agrega un producto al carrito
 * @param {number} id - ID del producto
 */
const addToCart = id => {
  const producto = PRODUCTS.find(x => x.id === id);
  const existente = cart.find(x => x.id === id);

  if (existente) {
    existente.qty += 1;
  } else {
    cart.push({ ...producto, qty: 1 });
  }

  updateCart();
  toast(`${producto.name} agregado al carrito`);
};

/**
 * Actualiza la visualización del carrito
 * Actualiza contador, total y lista de items
 */
const updateCart = () => {
  const count = cart.reduce((s, x) => s + x.qty, 0);
  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);

  // Actualizar contador
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = count;

  // Actualizar totales
  const totalEl = document.getElementById('cartTotalEl');
  const payTotal = document.getElementById('payTotal');
  if (totalEl) totalEl.textContent = fmtPrice(total);
  if (payTotal) payTotal.textContent = fmtPrice(total);

  // Renderizar items del carrito
  const el = document.getElementById('cartItemsEl');
  if (!el) return;

  if (!cart.length) {
    el.innerHTML = '<div class="empty-cart"><div class="empty-cart-icon">🛒</div><p>Tu carrito está vacío.<br>Agrega productos para comenzar.</p></div>';
  } else {
    el.innerHTML = cart.map(x => `
      <div class="cart-item">
        <img class="cart-item-img" src="${x.img}" alt="${x.name}">
        <div class="cart-item-info">
          <div class="cart-item-name">${x.name}</div>
          <div class="cart-item-price">${fmtPrice(x.price)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${x.id}, -1)">−</button>
            <span style="font-size:.85em">${x.qty}</span>
            <button class="qty-btn" onclick="changeQty(${x.id}, 1)">+</button>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${x.id})">Eliminar</button>
        </div>
      </div>
    `).join('');
  }

  // Actualizar orden de compra en checkout
  const items = document.getElementById('orderItems');
  if (items) {
    items.innerHTML = cart.map(x => `<div class="order-item"><span>${x.name} ×${x.qty}</span><span>${fmtPrice(x.price * x.qty)}</span></div>`).join('');
  }

  // Actualizar totales en checkout
  const subtotal = document.getElementById('oSubtotal');
  const oTotal = document.getElementById('oTotal');
  if (subtotal) subtotal.textContent = fmtPrice(total);
  if (oTotal) oTotal.textContent = fmtPrice(total);
};

/**
 * Cambia la cantidad de un producto en el carrito
 * @param {number} id - ID del producto
 * @param {number} d - Cambio de cantidad (-1 o +1)
 */
const changeQty = (id, d) => {
  const index = cart.findIndex(x => x.id === id);
  if (index < 0) return;

  cart[index].qty += d;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
};

/**
 * Elimina un producto del carrito
 * @param {number} id - ID del producto
 */
const removeFromCart = id => {
  cart = cart.filter(x => x.id !== id);
  updateCart();
};

// ==========================================
// 10. CARRITO Y MODAL
// ==========================================

/**
 * Alterna visibilidad del carrito
 */
const toggleCart = () => {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');

  if (drawer) drawer.classList.toggle('open');
  if (overlay) overlay.classList.toggle('open');
};

// ==========================================
// 11. FORMULARIOS Y AUTENTICACIÓN
// ==========================================

/**
 * Cambia entre tabs de login/registro
 * @param {string} tab - 'login' o 'register'
 */
window.switchTab = tab => {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));

  const form = document.getElementById(`${tab}Form`);
  if (form) form.classList.add('active');

  const tabIndex = tab === 'login' ? 1 : 2;
  const activeTab = document.querySelector(`.auth-tab:nth-child(${tabIndex})`);
  if (activeTab) activeTab.classList.add('active');
};

/**
 * Muestra mensaje en un formulario
 * @param {string} id - ID del elemento
 * @param {string} msg - Mensaje a mostrar
 * @param {boolean} isError - Si es error (rojo) o éxito (cyan)
 */
const showFormMessage = (id, msg, isError) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.style.color = isError ? '#ff6b6b' : 'var(--cyan)';
};

/**
 * Manejador de formulario de login
 */
const handleLogin = event => {
  event.preventDefault();
  limpiarErrores('loginForm');
  showFormMessage('loginMsg', '', true);

  const email = sanitizeInput(document.getElementById('loginEmail').value);
  const password = String(document.getElementById('loginPass').value);
  const result = iniciarSesion(email, password);

  if (!result.success) {
    showFieldError('loginEmailError', result.mensaje);
    showFieldError('loginPassError', result.mensaje);
    showFormMessage('loginMsg', result.mensaje, true);
    return;
  }

  showFormMessage('loginMsg', `¡Bienvenido de vuelta, ${result.usuario.nombre}!`, false);
  toast('Sesión iniciada correctamente ✓');
  actualizarDOM('perfil');
};

/**
 * Manejador de formulario de registro
 */
const handleRegister = event => {
  event.preventDefault();
  limpiarErrores('registerForm');
  showFormMessage('registerMsg', '', true);

  const name = sanitizeInput(document.getElementById('regName').value);
  const email = sanitizeInput(document.getElementById('regEmail').value);
  const password = String(document.getElementById('regPass').value);
  const confirmPassword = String(document.getElementById('regPass2').value);

  const result = validarDatos({
    nombre: name,
    email,
    password,
    confirmPassword
  });

  if (!result.valid) {
    result.errores.forEach(error => {
      const fieldId = error.campo === 'nombre' ? 'regNameError'
        : error.campo === 'confirmPassword' ? 'regPass2Error'
        : `${error.campo === 'email' ? 'regEmailError' : 'regPassError'}`;
      mostrarError(fieldId, error.msg);
    });
    showFormMessage('registerMsg', 'Corrige los campos e intenta de nuevo.', true);
    return;
  }

  registrarUsuario({ nombre: name, email, password });
  showFormMessage('registerMsg', '¡Cuenta creada exitosamente! Bienvenido/a.', false);
  toast('Cuenta creada. ¡Bienvenido/a a ViceLete! ✓');
  document.getElementById('registerForm').reset();
};

/**
 * Manejador de formulario de contacto
 */
const handleContact = event => {
  event.preventDefault();
  limpiarErrores('contactoForm');
  showFormMessage('contactMsg', '', true);

  const name = sanitizeInput(document.getElementById('contactName').value);
  const email = sanitizeInput(document.getElementById('contactEmail').value);
  const message = sanitizeInput(document.getElementById('contactMessage').value);

  const result = validarDatos({
    nombre: name,
    email,
    message
  });

  if (!result.valid) {
    result.errores.forEach(error => {
      const fieldId = error.campo === 'nombre' ? 'contactNameError'
        : error.campo === 'email' ? 'contactEmailError'
        : 'contactMessageError';
      mostrarError(fieldId, error.msg);
    });
    showFormMessage('contactMsg', 'Corrige los campos e intenta de nuevo.', true);
    return;
  }

  showFormMessage('contactMsg', 'Mensaje enviado con éxito. Gracias por contactarnos.', false);
  document.getElementById('contactoForm').reset();
};

// ==========================================
// 12. CHECKOUT Y PAGO
// ==========================================

/**
 * Avanza al paso 2 del checkout
 */
const goStep2 = () => {
  const required = [
    document.getElementById('ckName'),
    document.getElementById('ckEmail'),
    document.getElementById('ckAddr')
  ];

  if (required.some(x => !x || !x.value.trim())) {
    toast('Completa los datos de envío antes de continuar.');
    return;
  }

  const step1 = document.getElementById('checkoutStep1');
  const step2 = document.getElementById('checkoutStep2');

  if (step1) step1.style.display = 'none';
  if (step2) step2.style.display = 'block';

  document.getElementById('step2')?.classList.add('active');
};

/**
 * Regresa al paso 1 del checkout
 */
const backStep1 = () => {
  document.getElementById('checkoutStep2').style.display = 'none';
  document.getElementById('checkoutStep1').style.display = 'block';
};

/**
 * Selecciona un método de pago
 * @param {HTMLElement} el - Elemento del método de pago
 */
const selectPay = el => {
  document.querySelectorAll('.pay-method').forEach(m => m.classList.remove('active'));
  if (el) el.classList.add('active');
};

/**
 * Formatea número de tarjeta con espacios (XXXX XXXX XXXX XXXX)
 * @param {HTMLElement} el - Input de tarjeta
 */
const formatCard = el => {
  let v = el.value.replace(/\D/g, '').substring(0, 16);
  el.value = v.replace(/(\d{4})/g, '$1 ').trim();
};

/**
 * Procesa el pago
 */
const processPay = () => {
  const card = document.getElementById('ckCard')?.value.replace(/\s/g, '') || '';

  if (card.length < 16) {
    toast('Ingresa un número de tarjeta válido.');
    return;
  }

  if (!cart.length) {
    toast('Tu carrito está vacío.');
    return;
  }

  document.getElementById('successModal')?.classList.add('open');
  document.getElementById('step3')?.classList.add('active');
};

/**
 * Cierra el modal de éxito y limpia el checkout
 */
const closeModal = () => {
  document.getElementById('successModal')?.classList.remove('open');
  cart = [];
  updateCart();

  document.getElementById('checkoutStep2').style.display = 'none';
  document.getElementById('checkoutStep1').style.display = 'block';
  document.getElementById('step2')?.classList.remove('active');
  document.getElementById('step3')?.classList.remove('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ==========================================
// 13. NOTIFICACIONES Y UTILIDADES DOM
// ==========================================

/**
 * Muestra una notificación toast temporal
 * @param {string} msg - Mensaje a mostrar
 */
const toast = msg => {
  const wrap = document.getElementById('toastWrap');
  if (!wrap) return;

  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  wrap.appendChild(t);

  setTimeout(() => {
    t.style.animation = 'slideIn .3s ease reverse';
    setTimeout(() => t.remove(), 300);
  }, 3000);
};

/**
 * Actualiza secciones del DOM
 * @param {string} seccion - Sección a actualizar: 'productos', 'carrusel', 'perfil', 'resumen'
 */
const actualizarDOM = seccion => {
  if (seccion === 'productos') renderProducts(filtered);
  if (seccion === 'carrusel') initCategoryCarousel();
  if (seccion === 'resumen') updateCart();
};

/**
 * Muestra error en un campo
 * @param {string} inputId - ID del elemento de error
 * @param {string} msg - Mensaje de error
 */
const showFieldError = (inputId, msg) => {
  const el = document.getElementById(inputId);
  if (el) el.textContent = msg;
};

/**
 * Limpia los errores de un formulario
 * @param {string} formId - ID del formulario
 */
const clearFieldErrors = formId => {
  const form = document.getElementById(formId);
  if (!form) return;
  form.querySelectorAll('.field-error').forEach(el => el.textContent = '');
};

// ==========================================
// 14. INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================

/**
 * Inicializa la aplicación
 * Carga estado, renderiza productos, configura eventos
 */
const initApp = () => {
  // Cargar datos guardados
  loadState();

  // Renderizar productos y carrito
  renderProducts(PRODUCTS);
  updateCart();

  // Inicializar carrusel
  initCategoryCarousel();

  // Configurar event listeners de formularios
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const contactoForm = document.getElementById('contactoForm');

  if (loginForm) loginForm.addEventListener('submit', handleLogin);
  if (registerForm) registerForm.addEventListener('submit', handleRegister);
  if (contactoForm) contactoForm.addEventListener('submit', handleContact);

  console.log('✅ ViceLete App inicializado correctamente');
};

/**
 * Event listeners globales
 */
window.addEventListener('DOMContentLoaded', initApp);
window.addEventListener('load', () => {
  // Validar que se cargaron los productos
  if (!document.getElementById('prodGrid')?.childElementCount) {
    console.warn('prodGrid vacío, reintentando initApp.');
    initApp();
  }
});

// ==========================================
// 15. EXPOSICIÓN AL SCOPE GLOBAL (window)
// Permite usar estas funciones en HTML inline
// ==========================================

// Carrito
window.toggleCart = toggleCart;
window.changeQty = changeQty;
window.removeFromCart = removeFromCart;
window.addToCart = addToCart;

// Favoritos y productos
window.toggleFav = toggleFav;
window.filterProducts = filterProducts;
window.sortProducts = window.sortProducts; // Ya definido arriba

// Categorías
window.prevCategory = window.prevCategory; // Ya definido arriba
window.nextCategory = window.nextCategory; // Ya definido arriba

// Checkout
window.goStep2 = goStep2;
window.backStep1 = backStep1;
window.selectPay = selectPay;
window.formatCard = formatCard;
window.processPay = processPay;
window.closeModal = closeModal;

// Formularios
window.switchTab = window.switchTab; // Ya definido arriba
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.handleContact = handleContact;

// Rendering
window.renderProducts = renderProducts;

// Inicialización
window.initApp = initApp;

// Validación
window.validarDatos = validarDatos;

// Autenticación
window.registrarUsuario = registrarUsuario;
window.iniciarSesion = iniciarSesion;
window.cerrarSesion = cerrarSesion;

// Utilidades
window.actualizarDOM = actualizarDOM;
window.showFieldError = showFieldError;
window.clearFieldErrors = clearFieldErrors;

console.log('✅ main.js cargado exitosamente - Todas las funciones expuestas');
