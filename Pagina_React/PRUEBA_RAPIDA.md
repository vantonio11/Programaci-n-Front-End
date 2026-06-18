# 🚀 GUÍA RÁPIDA DE PRUEBA - Panel de Accesibilidad

## ⚡ Prueba en 30 segundos

### Paso 1: Inicia la app
```bash
cd Pagina_React
npm run dev
```

### Paso 2: Abre en navegador
- URL: `http://localhost:5173` (o la que veas en terminal)

### Paso 3: Abre DevTools
- Presiona **F12** o **Ctrl+Shift+I** (Windows)
- Ve a la pestaña **Console**

### Paso 4: Prueba cada tamaño

Copia y pega esto en la consola (uno a la vez):

```javascript
// PRUEBA 1: Normal (100%)
document.documentElement.style.fontSize = '100%';
console.log('✓ Tamaño 100%');

// PRUEBA 2: Grande (150%)
document.documentElement.style.fontSize = '150%';
console.log('✓ Tamaño 150%');

// PRUEBA 3: Muy grande (200%)
document.documentElement.style.fontSize = '200%';
console.log('✓ Tamaño 200%');

// PRUEBA 4: Extremo (250%)
document.documentElement.style.fontSize = '250%';
console.log('✓ Tamaño 250%');

// Restaurar
document.documentElement.style.fontSize = '100%';
```

---

## ✅ QUÉ VER EN CADA PRUEBA

### Para texto 100%
```
VISUAL:
  ✓ Panel se ve normal
  ✓ Todos los botones en fila
  ✓ Sin scroll
  ✓ Botón flotante arriba a la izquierda

ACCIÓN:
  1. Click en botón flotante → Panel abre
  2. Verifica que todo está visible
```

### Para texto 150%
```
VISUAL:
  ✓ Panel más grande
  ✓ Botones empiezan a hacer wrap
  ✓ Texto más grande

ACCIÓN:
  1. Panel sigue abierto
  2. Intenta scroll → Debe hacer scroll vertical
  3. Button "Restablecer Todo" debe estar visible al scrollear
```

### Para texto 200%
```
VISUAL:
  ⚠️ Panel MUCHO más grande
  ⚠️ Contenido se scrollea
  ⚠️ Botón "Restablecer Todo" se ve más abajo

ACCIÓN:
  1. Scroll dentro del panel con rueda del mouse
  2. Verifica: NO hay scroll horizontal
  3. Botón "Restablecer Todo" SIEMPRE visible en el fondo
  4. Botón flotante NUNCA está cubierto
  5. Click en "Restablecer Todo" → Funciona perfectamente
```

### Para texto 250%
```
VISUAL:
  🔴 Panel EXTREMADAMENTE grande
  🔴 Muchos elementos se stackean

ACCIÓN:
  1. Scroll vertical → Debe funcionar
  2. Todos los controles accesibles
  3. Ningún elemento oculto permanentemente
  4. Botón flotante SIEMPRE clickeable
```

---

## 🎯 PROBLEMAS A VERIFICAR

### ✓ Problema 1: "Panel crece sin control"
```
ANTES:
  ❌ Panel crece a 80vh
  ❌ Con texto 200%, sale de pantalla
  ❌ Botón "Restablecer" no se ve

DESPUÉS:
  ✅ Panel: max-height = calc(100vh - 10rem)
  ✅ Se ajusta dinámicamente
  ✅ Botón restablecer SIEMPRE visible
  
TEST:
  → Texto a 200% → Panel debe caber en pantalla
  → Scroll dentro del panel → Botón al bottom siempre visible
```

### ✓ Problema 2: "Botones se superponen"
```
ANTES:
  ❌ z-index: 9998 (botón flotante bajo panel 9999)
  ❌ Botón "Restablecer" dentro del scroll
  ❌ Puede tapar el flotante

DESPUÉS:
  ✅ z-index: 2147483647 (máximo posible)
  ✅ Botón "Restablecer" FUERA del scroll
  ✅ NUNCA se superponen
  
TEST:
  → Cualquier tamaño de texto
  → Botón flotante SIEMPRE clickeable
  → No hay overlap posible
```

### ✓ Problema 3: "Incompatible con texto grande"
```
ANTES:
  ❌ white-space: nowrap → Texto no hace wrap
  ❌ Botones se montan
  ❌ Scroll horizontal con 200%+

DESPUÉS:
  ✅ white-space: normal
  ✅ word-break: break-word
  ✅ Flex layout para ajustar
  ✅ Sin scroll horizontal
  
TEST:
  → Texto 150% → Botones hacen wrap
  → Texto 200% → Títulos se ajustan
  → Texto 250% → Todo sigue funcional
```

---

## 🔴 SI ALGO NO FUNCIONA

### Opción 1: Reload de la página
```javascript
// En consola
location.reload();

// Luego vuelve a cambiar el tamaño de texto
```

### Opción 2: Limpia localStorage
```javascript
localStorage.clear();
location.reload();
```

### Opción 3: Reinicia la app
```bash
# Ctrl+C en terminal
npm run dev
```

---

## 📊 TABLA DE VERIFICACIÓN

| Texto | Panel ajustado | Scroll vertical | Scroll horizontal | Botón flotante | Botones wrap | Accesible |
|-------|---|---|---|---|---|---|
| 100% | ✅ | ❌ (no needed) | ❌ | ✅ | ❌ (no needed) | ✅ |
| 150% | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| 200% | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| 250% | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |

---

## 💡 TIPS ÚTILES

### Ver más detalles en Console
```javascript
// Ver si localStorage está guardando bien
console.log(localStorage.getItem('accessibilitySettings'));

// Ver el tamaño actual del panel en px
document.getElementById('accessibility-panel').offsetHeight;

// Ver todas las variables CSS
getComputedStyle(document.documentElement).fontSize;
```

### Resetear y empezar de nuevo
```javascript
// Nuclear: Reset total
localStorage.clear();
document.documentElement.style.fontSize = '100%';
location.reload();
```

---

## 📱 PRUEBA EN MOBILE (Opcional)

### Simular móvil (415px ancho)
```bash
F12 → Ctrl+Shift+M → Selecciona "iPhone 12"
```

Luego prueba cambio de texto de nuevo.

---

## ✨ FINALIZADO

Si todos los tests **PASAN**, significa que los 3 problemas están **RESUELTOS**:

✅ Panel accesible con texto grande
✅ Botones nunca se superponen  
✅ Compatible con 100-250%+ tamaño de texto

