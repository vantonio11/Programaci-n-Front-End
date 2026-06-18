# 🎯 Guía Completa: Sistema de Accesibilidad

Esta guía documenta la implementación del sistema de accesibilidad completo en tu aplicación React.

---

## 📋 Contenido

1. [Descripción General](#descripción-general)
2. [Archivos Creados](#archivos-creados)
3. [Características Implementadas](#características-implementadas)
4. [Cómo Usar](#cómo-usar)
5. [Componentes y Estructura](#componentes-y-estructura)
6. [Personalización](#personalización)
7. [Cumplimiento WCAG](#cumplimiento-wcag)
8. [Troubleshooting](#troubleshooting)

---

## 📖 Descripción General

El sistema de accesibilidad es un menú flotante que permite a los usuarios personalizar la experiencia visual y de navegación de tu aplicación web. Todas las configuraciones se guardan en `localStorage`, por lo que se mantienen entre sesiones.

### Características Principales

✅ **Botón Flotante** - Ubicado en esquina inferior derecha, siempre visible  
✅ **Panel Deslizante** - Abre/cierra con animaciones suaves  
✅ **8 Funcionalidades Principales** - Todas sincronizadas y persistentes  
✅ **Diseño Responsive** - Funciona en desktop, tablet y móvil  
✅ **Accesible** - Atributos ARIA, navegación por teclado, contraste adecuado  
✅ **Moderno** - CSS Grid, Flexbox, CSS Variables, animaciones suaves  

---

## 📁 Archivos Creados

```
src/
├── components/
│   └── AccessibilityMenu.jsx        (Componente principal)
├── hooks/
│   └── useAccessibility.js          (Hook personalizado - opcional)
└── styles/
    └── accessibility.css            (Estilos completos)
```

### Archivo: `AccessibilityMenu.jsx` (352 líneas)
- Componente React completo
- Gestiona todo el estado de accesibilidad
- Aplica estilos dinámicamente al `document.documentElement`
- Persiste en localStorage automáticamente

### Archivo: `accessibility.css` (654 líneas)
- Estilos modernos y limpios
- Responsive design
- Variables CSS para fácil personalización
- Soporte para modo oscuro
- Accesibilidad WCAG incluida

### Archivo: `useAccessibility.js` (91 líneas)
- Hook personalizado (opcional)
- Reutilizable en múltiples componentes
- Gestión centralizada de lógica

---

## ✨ Características Implementadas

### 1. **Tamaño de Texto**
- Aumentar en 10% (máximo 200%)
- Disminuir en 10% (mínimo 80%)
- Botón de restablecer a 100%
- Visualización en tiempo real del porcentaje actual

### 2. **Contraste y Visualización**
- **Normal** - Colores originales
- **Alto Contraste** - Mejora la visibilidad
- **Contraste Invertido** - Fondo oscuro/texto claro
- **Escala de Grises** - Para personas con daltonismo
- Botón de restablecer

### 3. **Legibilidad**
- **Espaciado de Letras** - Aumenta hasta 10px
- **Altura de Línea** - Ajustable de 1.0 a 3.0
- **Fuente para Dislexia** - Fuente amigable (OpenDyslexic)
- Botón de restablecer

### 4. **Navegación y Comodidad**
- **Resaltar Enlaces** - Subrayado + fondo amarillo
- **Resaltar Encabezados** - Fondo azul + borde izquierdo
- **Cursor Grande** - Cursor personalizado más visible
- **Detener Animaciones** - Desactiva transiciones (respeta `prefers-reduced-motion`)

### 5. **Persistencia**
- Todas las configuraciones se guardan en localStorage
- Se cargan automáticamente al recargar la página
- Botón "Restablecer Todas las Configuraciones" limpia todo

---

## 🚀 Cómo Usar

### Paso 1: Integración (ya hecho)
El componente ya está integrado en `App.jsx`:

```jsx
import AccessibilityMenu from './components/AccessibilityMenu';

function App() {
  return (
    <>
      {/* Resto de componentes */}
      <AccessibilityMenu />
    </>
  );
}
```

### Paso 2: Verificar Estilos
Asegúrate de que el archivo `accessibility.css` esté correctamente importado en `AccessibilityMenu.jsx`:

```jsx
import '../styles/accessibility.css';
```

### Paso 3: Uso del Usuario Final
1. Buscar el botón circular azul en esquina inferior derecha
2. Hacer clic para abrir el panel de accesibilidad
3. Ajustar las configuraciones deseadas
4. El panel se cerrará automáticamente si se recarga la página (configuraciones persisten)
5. Hacer clic en "X" o botón de cerrar para ocultar el panel

---

## 🏗️ Componentes y Estructura

### Estructura del Componente `AccessibilityMenu.jsx`

```
AccessibilityMenu
├── Estado
│   ├── isOpen (boolean)
│   ├── fontSize (number)
│   ├── contrast (string)
│   ├── letterSpacing (number)
│   ├── lineHeight (number)
│   ├── dyslexiaFont (boolean)
│   ├── highlightLinks (boolean)
│   ├── highlightHeadings (boolean)
│   ├── largeCursor (boolean)
│   └── stopAnimations (boolean)
│
├── Funciones Principales
│   ├── loadAccessibilitySettings()
│   ├── saveAccessibilitySettings()
│   ├── applyAccessibilitySettings()
│   ├── increaseFontSize()
│   ├── decreaseFontSize()
│   ├── resetFontSize()
│   ├── resetContrast()
│   ├── resetReadability()
│   ├── resetAllSettings()
│   └── toggleMenu()
│
└── Elementos JSX
    ├── Botón Flotante
    │   ├── SVG Accesibilidad (cerrado)
    │   └── SVG "X" (abierto)
    │
    └── Panel (accessibility-panel)
        ├── Sección Tamaño de Texto
        ├── Sección Contraste y Visualización
        ├── Sección Legibilidad
        ├── Sección Navegación y Comodidad
        └── Botón Restablecer Todo
```

### Estructura del CSS

```css
:root (Variables de diseño)
├── Colores
├── Espaciado
├── Bordes
└── Transiciones

.accessibility-button (Botón flotante)
├── Posición fija
├── Estilos hover/focus/active
└── Responsive

.accessibility-panel (Panel principal)
├── Animaciones de apertura/cierre
├── Scrollbar personalizada
└── Responsive

.accessibility-section (Secciones del panel)
├── Títulos
├── Controles
├── Sliders
└── Toggles

Clases aplicables al :root
├── .accessibility-dyslexia-font
├── .accessibility-highlight-links
├── .accessibility-highlight-headings
├── .accessibility-large-cursor
└── .accessibility-no-animations
```

---

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `accessibility.css`:

```css
:root {
  --accessibility-primary: #0066cc;           /* Color azul */
  --accessibility-primary-hover: #0052a3;    /* Color azul oscuro */
  --accessibility-secondary: #f5f5f5;        /* Gris claro */
  --accessibility-text: #333333;              /* Texto oscuro */
  /* ... más variables */
}
```

### Cambiar Posición del Botón

En `accessibility.css`, modifica `.accessibility-button`:

```css
.accessibility-button {
  bottom: 2rem;  /* Distancia desde abajo */
  right: 2rem;   /* Distancia desde la derecha */
  /* Para esquina superior izquierda: */
  /* top: 2rem; left: 2rem; */
}
```

### Cambiar Tamaño del Botón

```css
.accessibility-button {
  width: 60px;   /* Diámetro */
  height: 60px;  /* Diámetro */
}
```

### Agregar Más Funcionalidades

1. Añade un nuevo estado en `AccessibilityMenu.jsx`:
   ```jsx
   const [newFeature, setNewFeature] = useState(false);
   ```

2. Aplica el efecto en `applyAccessibilitySettings()`:
   ```jsx
   if (newFeature) {
     root.classList.add('accessibility-new-feature');
   } else {
     root.classList.remove('accessibility-new-feature');
   }
   ```

3. Crea la clase CSS en `accessibility.css`:
   ```css
   .accessibility-new-feature {
     /* Estilos aquí */
   }
   ```

4. Añade el control en el JSX:
   ```jsx
   <div className="accessibility-toggle">
     <label>
       <input
         type="checkbox"
         checked={newFeature}
         onChange={(e) => setNewFeature(e.target.checked)}
       />
       Nueva Característica
     </label>
   </div>
   ```

---

## ♿ Cumplimiento WCAG

El sistema implementa estándares de accesibilidad:

### WCAG 2.1 Level AA

✅ **1.4.3 Contraste (Mínimo)** - Botones con ratio 4.5:1  
✅ **1.4.8 Visual Presentation** - Ajustes de espaciado y línea  
✅ **2.1.1 Keyboard** - Navegación completa por teclado  
✅ **2.1.2 No Keyboard Trap** - Foco visible y manejable  
✅ **2.4.3 Focus Order** - Orden lógico de elementos  
✅ **2.4.7 Focus Visible** - Indicador de foco visible  
✅ **3.3.1 Error Identification** - Validaciones claras  
✅ **4.1.2 Name, Role, Value** - ARIA labels completos  

### Atributos ARIA Implementados

```jsx
aria-label              // Etiquetas descriptivas
aria-expanded          // Estado del panel (abierto/cerrado)
aria-controls          // Relación botón-panel
aria-pressed           // Estado de botones toggle
aria-label             // Descripción de controles
role="region"          // Rol semántico del panel
role="button"          // Implícito en <button>
```

### Características de Accesibilidad

- Navegación completa por **Tab**, **Enter** y **Espacio**
- Indicadores de foco visibles en todos los elementos
- Contraste de colores accesible
- Respeta `prefers-reduced-motion` del sistema operativo
- Modo oscuro automático según `prefers-color-scheme`
- Cursor personalizado con suficiente visibilidad

---

## 🔧 Troubleshooting

### El botón no aparece

**Posible causa:** Conflicto de z-index con otros elementos

**Solución:**
```css
.accessibility-button {
  z-index: 9998 !important;
}

.accessibility-panel {
  z-index: 9999 !important;
}
```

### Las configuraciones no persisten

**Posible causa:** localStorage está deshabilitado

**Solución:** Verifica que localStorage esté habilitado:
```javascript
console.log(localStorage); // Debe mostrar el objeto Storage
```

### El panel se superpone con otros elementos

**Posible causa:** Elementos con `position: fixed` o `z-index` alto

**Solución:** Ajusta el z-index en `accessibility.css`:
```css
.accessibility-button {
  z-index: 99999; /* Aumenta según sea necesario */
}
```

### Las fuentes no se aplican correctamente

**Posible causa:** La fuente OpenDyslexic no está disponible

**Solución:** Intenta importar desde Google Fonts en `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=OpenDyslexic&display=swap" rel="stylesheet">
```

### En móvil, el panel está cortado

**Posible causa:** Viewport muy pequeño

**Solución:** Los estilos responsive ya están incluidos, pero verifica:
```css
@media (max-width: 480px) {
  .accessibility-panel {
    max-height: 70vh; /* Ajusta según sea necesario */
  }
}
```

---

## 📚 Referencias y Recursos

### Estándares WCAG
- [Web Content Accessibility Guidelines 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)

### Diseño Accesible
- [Material Design - Accessibility](https://material.io/design/usability/accessibility.html)
- [A11y Project](https://www.a11yproject.com/)

### Recursos en Español
- [Accesibilidad Web - Mozilla](https://developer.mozilla.org/es/docs/Glossary/Accesibilidad)
- [Guía WCAG 2.1 en español](https://www.w3.org/Translations/WCAG21-es/)

---

## 💡 Consejos Finales

1. **Prueba tu accesibilidad** - Usa [axe DevTools](https://www.deque.com/axe/devtools/) o [Lighthouse](https://developers.google.com/web/tools/lighthouse)
2. **Navega por teclado** - Usa Tab, Shift+Tab, Enter y Espacio para verificar
3. **Prueba con lectores de pantalla** - NVDA (Windows) o JAWS
4. **Incluye retroalimentación** - Permite a usuarios reportar problemas de accesibilidad
5. **Documenta cambios** - Si modificas la funcionalidad, actualiza esta guía

---

## 📞 Soporte

Si experimentas problemas o necesitas agregar más características, verifica:
- La consola del navegador (F12) para errores
- El tab "Application" para verificar localStorage
- Los estilos en DevTools para conflictos CSS

¡Que disfrutes de una aplicación web más accesible! ♿✨

