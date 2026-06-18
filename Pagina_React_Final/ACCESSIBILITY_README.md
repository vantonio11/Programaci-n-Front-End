# 🎯 Sistema de Accesibilidad - README

Sistema completo de accesibilidad para aplicaciones React con menú flotante, persistencia en localStorage, y cumplimiento de estándares WCAG.

## 🚀 Quick Start

### 1. Verificar Instalación
El componente ya está integrado en tu `App.jsx`. Solo necesitas verificar:

```bash
# Los siguientes archivos deben existir:
src/components/AccessibilityMenu.jsx
src/styles/accessibility.css
src/hooks/useAccessibility.js (opcional)
```

### 2. Inicia tu Aplicación
```bash
npm install
npm run dev
```

### 3. Busca el Botón
En la esquina **inferior derecha** de la pantalla, verás un botón azul circular. ¡Ese es el menú de accesibilidad!

---

## 📋 Características

| Característica | Estado | Descripción |
|---|---|---|
| 🔘 Botón Flotante | ✅ | Visible en esquina inferior derecha, siempre accesible |
| 📊 Tamaño de Texto | ✅ | Aumenta hasta 200%, disminuye hasta 80% |
| 🎨 Contraste | ✅ | 4 modos: Normal, Alto, Invertido, Escala de Grises |
| 📖 Legibilidad | ✅ | Espaciado de letras, altura de línea, fuente para dislexia |
| 🔗 Navegación | ✅ | Resaltar enlaces, encabezados, cursor grande, sin animaciones |
| 💾 Persistencia | ✅ | Todas las configuraciones se guardan en localStorage |
| ♿ Accesibilidad | ✅ | WCAG 2.1 Level AA compliant |
| 📱 Responsive | ✅ | Funciona perfectamente en desktop, tablet y móvil |
| 🌙 Modo Oscuro | ✅ | Se adapta automáticamente al tema del SO |

---

## 🏗️ Estructura de Archivos

```
Pagina_React/
├── src/
│   ├── components/
│   │   ├── AccessibilityMenu.jsx     ← Componente principal
│   │   └── ...otros componentes
│   ├── styles/
│   │   ├── accessibility.css         ← Estilos del menú
│   │   └── ...otros estilos
│   ├── hooks/
│   │   ├── useAccessibility.js       ← Hook auxiliar (opcional)
│   │   └── ...otros hooks
│   └── App.jsx                       ← Componente integrado aquí
├── ACCESSIBILITY_GUIDE.md            ← Guía completa
├── ACCESSIBILITY_TESTING.md          ← Instrucciones de prueba
└── ...otros archivos
```

---

## 🎮 Uso Básico

### Para Desarrolladores

**Leer valores actuales:**
```javascript
// En la consola del navegador
const settings = JSON.parse(localStorage.getItem('accessibilitySettings'));
console.log(settings);
```

**Limpiar configuración:**
```javascript
localStorage.removeItem('accessibilitySettings');
location.reload();
```

**Agregar nuevas funcionalidades:**
1. Añade un nuevo estado en `AccessibilityMenu.jsx`
2. Aplica el cambio en `applyAccessibilitySettings()`
3. Crea la clase CSS correspondiente
4. Añade el control UI en el JSX

### Para Usuarios Finales

1. **Busca** el botón azul circular en esquina inferior derecha
2. **Haz clic** para abrir el menú de accesibilidad
3. **Ajusta** cualquiera de las 8 opciones disponibles
4. **Los cambios se guardan automáticamente** (incluso después de cerrar y reabrir el navegador)

---

## 📊 Configuraciones Guardadas

El localStorage almacena un JSON como este:

```json
{
  "fontSize": 120,
  "contrast": "high",
  "letterSpacing": 5,
  "lineHeight": 2.0,
  "dyslexiaFont": true,
  "highlightLinks": true,
  "highlightHeadings": false,
  "largeCursor": false,
  "stopAnimations": true
}
```

---

## ♿ Cumplimiento WCAG

✅ **1.4.3 Contraste (Mínimo)** - Ratio 4.5:1 en botones  
✅ **1.4.8 Visual Presentation** - Ajustes completos de presentación visual  
✅ **2.1.1 Keyboard** - Navegación completa sin ratón  
✅ **2.4.3 Focus Order** - Orden lógico de tabulación  
✅ **2.4.7 Focus Visible** - Indicador de foco visible en todos lados  
✅ **3.3.1 Error Identification** - Etiquetas ARIA claras  
✅ **4.1.2 Name, Role, Value** - Semántica HTML correcta  

Ver [ACCESSIBILITY_GUIDE.md](./ACCESSIBILITY_GUIDE.md) para detalles completos.

---

## 🎨 Personalización

### Cambiar Colores Primarios

Edita `src/styles/accessibility.css`:

```css
:root {
  --accessibility-primary: #YOUR_COLOR;
  --accessibility-primary-hover: #HOVER_COLOR;
}
```

### Cambiar Posición del Botón

En `accessibility.css`:

```css
.accessibility-button {
  bottom: 2rem;   /* Cambiar posición vertical */
  right: 2rem;    /* Cambiar posición horizontal */
}
```

### Cambiar Tamaño del Botón

```css
.accessibility-button {
  width: 60px;    /* Ancho */
  height: 60px;   /* Alto */
}
```

---

## 🔍 Diagnóstico

### El botón no aparece
```javascript
// En consola, verifica:
console.log(document.querySelector('.accessibility-button')); // Debe existir
console.log(getComputedStyle(document.documentElement).zIndex); // z-index OK
```

### Las configuraciones no persisten
```javascript
// Verifica que localStorage esté habilitado
console.log(typeof(Storage)); // Must be 'object'
localStorage.setItem('test', '1');
localStorage.getItem('test'); // Debe devolver '1'
```

### Los estilos no se aplican
```javascript
// Verifica que accessibility.css esté cargado
const links = document.querySelectorAll('link[rel="stylesheet"]');
console.log(links); // Busca accessibility.css
```

---

## 📱 Responsive Breakpoints

```css
/* Desktop */
@media (min-width: 1025px)
  Botón: 60x60px
  Panel: 350px ancho

/* Tablet */
@media (max-width: 1024px)
  Botón: 55x55px
  Panel: 320px ancho

/* Móvil */
@media (max-width: 768px)
  Botón: 50x50px
  Panel: 90% ancho

/* Móvil pequeño */
@media (max-width: 480px)
  Botón: 48x48px, posición ajustada
  Panel: 95% ancho, centrado
```

---

## 🧪 Testing

Ejecuta las pruebas manuales en [ACCESSIBILITY_TESTING.md](./ACCESSIBILITY_TESTING.md):

```
✓ Botón Flotante
✓ Abrir/Cerrar Panel
✓ Tamaño de Texto
✓ Contraste
✓ Legibilidad
✓ Navegación y Comodidad
✓ Persistencia en localStorage
✓ Restablecer Todas las Configuraciones
✓ Accesibilidad por Teclado
✓ Responsive Design
✓ Compatibilidad de Navegadores
✓ WCAG Compliance
✓ Performance
```

---

## 🔧 Troubleshooting

| Problema | Solución |
|---|---|
| Botón no visible | Aumenta z-index: `z-index: 99999 !important;` |
| Panel no abre | Verifica que no haya conflicto de CSS |
| Configuraciones no guardan | Activa localStorage: F12 → Application → Storage → Cookies |
| Estilos extraños | Limpia localStorage y recarga: `localStorage.clear(); location.reload();` |
| En móvil se ve cortado | Ajusta max-height en media queries de `accessibility.css` |

---

## 📚 Documentación Completa

- 📖 [ACCESSIBILITY_GUIDE.md](./ACCESSIBILITY_GUIDE.md) - Guía completa con explicaciones detalladas
- 🧪 [ACCESSIBILITY_TESTING.md](./ACCESSIBILITY_TESTING.md) - Instrucciones para probar todas las funcionalidades
- 🎨 CSS Variables en [accessibility.css](./src/styles/accessibility.css)
- ⚛️ Componente React en [AccessibilityMenu.jsx](./src/components/AccessibilityMenu.jsx)

---

## 🌍 Soporte de Navegadores

| Navegador | Desktop | Móvil | Notas |
|---|---|---|---|
| Chrome | ✅ Completo | ✅ Completo | Totalmente soportado |
| Firefox | ✅ Completo | ✅ Completo | CSS Grid y Variables OK |
| Safari | ✅ Completo | ✅ Completo | Todos los estándares |
| Edge | ✅ Completo | ✅ Completo | Basado en Chrome |
| IE 11 | ❌ No | N/A | No soportado (usa CSS Grid) |

---

## 📞 Soporte y Mejoras

Si necesitas:
- ❓ Hacer preguntas → Ver [ACCESSIBILITY_GUIDE.md](./ACCESSIBILITY_GUIDE.md)
- 🐛 Reportar bugs → Abre una issue en el repositorio
- 💡 Sugerir mejoras → Pull request bienvenido
- 🎨 Personalizar → Edita variables CSS o agrega nuevas funcionalidades

---

## 📄 Licencia

Este código está disponible para usar libremente en tu proyecto.

---

## ✨ Estándares Implementados

- ♿ WCAG 2.1 Level AA
- 🌐 Aria Authoring Practices Guide (APG)
- 📱 Mobile Accessibility Guidelines
- 🔍 SEO Friendly

---

## 🎯 Próximos Pasos

1. ✅ Integración completada
2. 🧪 Ejecuta las pruebas en [ACCESSIBILITY_TESTING.md](./ACCESSIBILITY_TESTING.md)
3. 🎨 Personaliza colores y posición si es necesario
4. 📊 Usa [axe DevTools](https://www.deque.com/axe/devtools/) para auditar
5. 🚀 Despliega a producción

---

**¡Tu aplicación es ahora más accesible para todos! ♿✨**

Último actualizado: Junio 2026

