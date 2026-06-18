# 🚀 Accesibilidad - Referencia Rápida

## En 60 Segundos

1. **Ubicación del Botón:** Esquina inferior derecha (azul, circular)
2. **Cómo Abrirlo:** Haz clic en el botón
3. **Cómo Cerrarlo:** Haz clic en la "X" del panel
4. **¿Se Guardan los Cambios?** Sí, automáticamente en localStorage

---

## 🎮 Controles Disponibles

### Tamaño de Texto
```
🔤 A−  (disminuir)     Reduce 10%
🔤 Valor en %          Muestra configuración actual
🔤 A+  (aumentar)      Aumenta 10%
🔤 Restablecer         Vuelve a 100%
```
Rango: **80% - 200%**

### Contraste
```
🎨 Normal              Colores originales
🎨 Alto                Más contraste (mejora visibilidad)
🎨 Invertido           Fondo oscuro + texto claro
🎨 Grises              Escala de grises (daltonismo)
🎨 Restablecer         Vuelve a normal
```

### Legibilidad
```
📖 Espaciado Letras    Slider 0-10px
📖 Altura Línea       Slider 1.0-3.0
📖 Fuente Dislexia    Toggle (ON/OFF)
📖 Restablecer        Vuelve a normal
```

### Navegación
```
🔗 Resaltar Enlaces      Toggle (subrayado + amarillo)
📝 Resaltar Encabezados   Toggle (fondo azul)
🖱️ Cursor Grande         Toggle (círculo personalizado)
⏸️ Detener Animaciones    Toggle (desactiva transiciones)
```

### Maestro
```
🔄 Restablecer TODO    Limpia todo y localStorage
```

---

## 🔍 Por Tipo de Discapacidad

### Baja Visión
```
✅ Aumenta Tamaño de Texto (A+)
✅ Activa Alto Contraste
✅ Aumenta Altura de Línea
✅ Activa Cursor Grande
```

### Ceguera (Lector de Pantalla)
```
✅ Todos los controles tienen aria-label
✅ Completamente navegable por teclado
✅ Tab/Shift+Tab para navegar
✅ Enter/Espacio para activar
```

### Dislexia
```
✅ Activa Fuente Dislexia (OpenDyslexic)
✅ Aumenta Espaciado de Letras
✅ Aumenta Altura de Línea
✅ Resalta Enlaces y Encabezados
```

### Fotosensibilidad / Ansiedad
```
✅ Detén Animaciones
✅ Activa Escala de Grises
✅ Reduce Contraste Invertido (si es necesario)
```

### Daltonismo
```
✅ Activa Escala de Grises
✅ Aumenta Alto Contraste
✅ Resalta Enlaces (no solo color)
```

---

## ⌨️ Navegación por Teclado

```
TAB              Navega adelante
SHIFT + TAB      Navega atrás
ENTER            Activa botones
ESPACIO          Activa botones/checkboxes
ESC              Cierra el panel (si se implementa)
```

---

## 💾 Datos Guardados

**Archivo:** localStorage  
**Clave:** `accessibilitySettings`

```json
{
  "fontSize": 100,
  "contrast": "normal",
  "letterSpacing": 0,
  "lineHeight": 1.5,
  "dyslexiaFont": false,
  "highlightLinks": false,
  "highlightHeadings": false,
  "largeCursor": false,
  "stopAnimations": false
}
```

**Para ver en consola:**
```javascript
localStorage.getItem('accessibilitySettings')
```

**Para limpiar:**
```javascript
localStorage.removeItem('accessibilitySettings')
location.reload()
```

---

## 🐛 Problemas Rápidos

| Problema | Solución |
|---|---|
| Botón no se ve | F12 → busca `.accessibility-button` |
| Panel no abre | Recarga página (Ctrl+F5) |
| Cambios no guardan | localStorage activado? |
| Se ve extraño | localStorage.clear(); F5 |
| En móvil cortado | DevTools → Toggle device / responsivo |

---

## 📊 Información Técnica

| Aspecto | Detalles |
|---|---|
| **Framework** | React 18+ |
| **Estilos** | CSS Vanilla (Variables CSS) |
| **Storage** | localStorage API |
| **Accesibilidad** | WCAG 2.1 Level AA |
| **Navegadores** | Chrome, Firefox, Safari, Edge |
| **Tamaño CSS** | ~15KB (minificado) |
| **Tamaño JS** | ~12KB (minificado) |

---

## 🎯 Checklist de Implementación

- ✅ AccessibilityMenu.jsx creado
- ✅ accessibility.css creado
- ✅ useAccessibility.js creado (opcional)
- ✅ Integrado en App.jsx
- ✅ localStorage funciona
- ✅ Estilos se aplican
- ✅ ARIA labels agregados
- ✅ Responsive implementado

---

## 📱 Puntos de Quiebre Responsive

```
Desktop:    ≥ 1025px  →  Botón 60x60,   Panel 350px
Tablet:     769-1024px  →  Botón 55x55,   Panel 320px
Móvil:      ≤ 768px   →  Botón 50x50,   Panel 90% + 16px margen
Móvil s:    ≤ 480px   →  Botón 48x48,   Panel 95% centrado
```

---

## 🎨 Principales Variables CSS

```css
--accessibility-primary:         #0066cc   (azul)
--accessibility-primary-hover:   #0052a3   (azul oscuro)
--accessibility-secondary:       #f5f5f5   (gris claro)
--accessibility-text:            #333333   (gris oscuro)
--accessibility-border:          #ddd      (borde)
--accessibility-shadow:          rgba(...) (sombra)
--accessibility-success:         #28a745   (verde)
```

---

## 📖 Archivos Principales

```
src/components/AccessibilityMenu.jsx    ← Componente principal
src/styles/accessibility.css             ← Todos los estilos
src/hooks/useAccessibility.js           ← Hook (opcional, reusable)
src/App.jsx                              ← Integración
```

---

## 🚀 Comandos Útiles

```bash
# Ver en desarrollo
npm run dev

# Verificar errores
npm run lint

# Construir para producción
npm run build

# En consola del navegador
localStorage.getItem('accessibilitySettings')     # Ver
localStorage.removeItem('accessibilitySettings')  # Limpiar
location.reload()                                  # Recargar
```

---

## 🌐 URLs de Referencia

- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/docs/Web/Accessibility)
- [A11y Project](https://www.a11yproject.com/)

---

## 📞 En Caso de Dudas

1. Lee [ACCESSIBILITY_GUIDE.md](./ACCESSIBILITY_GUIDE.md) para detalles
2. Revisa [ACCESSIBILITY_TESTING.md](./ACCESSIBILITY_TESTING.md) para pruebas
3. Consulta el código comentado en AccessibilityMenu.jsx
4. Verifica variables CSS en accessibility.css

---

## ✨ ¡Listo!

Tu sistema de accesibilidad está 100% funcional.

- ✅ Usuarios con baja visión pueden aumentar texto
- ✅ Usuarios con contraste pueden cambiar colores  
- ✅ Usuarios con dislexia pueden activar fuente especial
- ✅ Usuarios con fotosensibilidad pueden detener animaciones
- ✅ Todos pueden usar navegación por teclado
- ✅ Todas las configuraciones permanecen entre sesiones

**¡Felicidades una aplicación más accesible! ♿**

---

*Versión 1.0 - Junio 2026*
