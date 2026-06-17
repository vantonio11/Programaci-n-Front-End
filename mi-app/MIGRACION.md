# ViceLeteChile — Migración a React + Vite

## Estado: migración funcional completa

Build de producción verificado sin errores (`vite build` → 37 módulos, OK).

## Qué se hizo en esta sesión

### Arreglos de fundación
- `index.html`: favicon corregido (`/imagenes/logo/logo.svg`), eliminado el `<link>` de CSS roto que apuntaba a una ruta inexistente.
- `main.jsx`: ahora importa el CSS real (`./styles/estilo_pag_rop.css`). Antes importaba el `index.css` boilerplate de Vite, que traía `#root{width:1126px}` y habría roto el layout full-width del sitio.
- Imágenes movidas a `public/imagenes/` (antes estaban en `src/assets/imagenes`, inaccesibles para las rutas absolutas `/imagenes/...` que usa `products.js`).
- Eliminado: `src/index.css`, `src/App.css` (boilerplate Vite), `src/assets/` completo (ya duplicado en `public/`), los 3 `Formulario_de_*.js` originales que estaban copiados sin migrar dentro de `src/components/`.
- Confirmados nombres reales de imágenes de categoría: `casual.jpg`, `formal.jpg`, `deportiva.jpg`, `lujo.jpg`.

### Componentes nuevos (src/components/)
- `Header.jsx`, `Hero.jsx`, `Footer.jsx` — secciones estáticas migradas 1:1 desde el HTML original.
- `CategoryCarousel.jsx` — carrusel de categorías, conectado a `useCarousel`. Click en una categoría filtra el grid de productos.
- `ProductGrid.jsx` — ahora incluye los botones de filtro por categoría y el selector de orden (antes solo tenía el grid).
- `AuthSection.jsx` — login + registro con tabs, usando `useState` en vez de manipulación del DOM. Conectado a `useAuth`.
- `ContactForm.jsx` — formulario de contacto con validación.
- `Checkout.jsx` — flujo de 2 pasos (datos/envío → pago) + modal de éxito. Incluye formateo de tarjeta en vivo, selección de método de pago y resumen de orden en tiempo real.
- `Toasts.jsx` — notificaciones, reemplaza el `toast()` que manipulaba el DOM con `createElement`.

### Hooks nuevos (src/hooks/)
- `useAuth.js` — migra `registrarUsuario`/`iniciarSesion`/`cerrarSesion` y persistencia en `localStorage` (mismas claves `Lete_usuarios_v1` y `Lete_sesion_v1` que el original, para no perder datos de usuarios previos).
- `useFavorites.js` — favoritos con `Set`, dispara toast al agregar.
- `useProductFilters.js` — filtro por categoría + orden (precio asc/desc, nuevo ingreso), con `useMemo`.
- `useToasts.js` — cola de notificaciones con animación de entrada/salida (la salida usa una clase `.toast.leaving` agregada al CSS).
- `useCarousel.js` (ya existía) — sin cambios.
- `useCart.js` — extendido con `clearCart` (para el checkout) y callback de toast al agregar producto.

### Utilidades (src/utils/)
- `validation.js` — migra `sanitizeInput`, `validateEmail`, `validatePassword`, `validarDatos` desde `Formulario_de_Registro.js`, como funciones puras sin `window.*` ni DOM.

### CSS
- Se agregó una sola regla nueva: `.toast.leaving{animation:slideIn .3s ease reverse}`, para reproducir en CSS la animación de salida que el original hacía manipulando `style.animation` desde JS. Todo lo demás de `estilo_pag_rop.css` es idéntico al original.

## Cómo correrlo

```bash
npm install
npm run dev
```

## Pendiente / posibles mejoras futuras
- El carrito, favoritos y filtro de productos no persisten en `localStorage` (en el original tampoco persistían, solo usuarios/sesión — se mantuvo el mismo comportamiento).
- No hay protección de rutas: cualquiera puede ver `#checkout` sin iniciar sesión (igual que el original).
- Las contraseñas se guardan en texto plano en `localStorage` vía `useAuth` — esto replica fielmente el comportamiento original, pero no es apto para producción real; si esto migra a un backend real, hay que hashear contraseñas server-side.
- No se agregó React Router: la navegación sigue siendo anchors (`#inicio`, `#catalogo`, etc.) sobre una sola página, igual que el sitio original. Si se quiere URLs reales por sección, eso sería trabajo nuevo, no parte de la migración 1:1.
