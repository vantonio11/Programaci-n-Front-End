/**
 * EJEMPLOS AVANZADOS - Sistema de Accesibilidad
 * 
 * Casos de uso, integraciones y ejemplos de extensión
 */

/**
 * EJEMPLO 1: Usar el Hook useAccessibility en Otros Componentes
 * 
 * Si quieres acceder a configuraciones de accesibilidad en otros componentes:
 */

// archivo: src/components/MiComponente.jsx
import { useAccessibility } from '../hooks/useAccessibility';

function MiComponente() {
  // Cargar y usar el hook
  const {
    fontSize,
    contrast,
    dyslexiaFont,
    highlightLinks,
    // ... otros valores
  } = useAccessibility();

  return (
    <div style={{
      // Aplicar estilos basados en preferencias de accesibilidad
      fontSize: `${fontSize}%`,
      filter: contrast === 'inverted' ? 'invert(1)' : 'none',
      fontFamily: dyslexiaFont ? 'OpenDyslexic, sans-serif' : 'inherit',
    }}>
      <p className={highlightLinks ? 'accessibility-highlight-links' : ''}>
        Contenido que respeta preferencias de accesibilidad
      </p>
    </div>
  );
}

export default MiComponente;

/**
 * EJEMPLO 2: Sincronizar Accesibilidad con Base de Datos
 * 
 * Si tienes usuarios autenticados y quieres guardar sus preferencias:
 */

// archivo: src/components/AccessibilityMenuExtended.jsx
// (Versión mejorada de AccessibilityMenu.jsx)

import { useState, useEffect } from 'react';
import '../styles/accessibility.css';

const AccessibilityMenuExtended = ({ userId, onSavePreferences }) => {
  const [settings, setSettings] = useState({...});

  // Efecto: guardar en base de datos cuando cambian sus preferencias
  useEffect(() => {
    // Solo guardar si el usuario está autenticado
    if (userId && settings !== null) {
      const timer = setTimeout(async () => {
        try {
          // Hacer POST a tu API
          const response = await fetch('/api/accessibility-preferences', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, settings }),
          });
          
          if (response.ok) {
            console.log('Preferencias guardadas en servidor');
            onSavePreferences?.(settings);
          }
        } catch (error) {
          console.error('Error al guardar preferencias:', error);
          // Fallback a localStorage si el servidor no responde
          localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
        }
      }, 1000); // Debounce de 1 segundo

      return () => clearTimeout(timer);
    }
  }, [settings, userId, onSavePreferences]);

  // ... resto del componente igual que AccessibilityMenu
  return null; // Placeholder
};

export default AccessibilityMenuExtended;

/**
 * EJEMPLO 3: Detectar Preferencias del Sistema Operativo
 * 
 * Aplicar automáticamente las preferencias de accesibilidad del SO:
 */

// archivo: src/hooks/useSystemAccessibility.js
import { useEffect, useState } from 'react';

export const useSystemAccessibility = () => {
  const [preferences, setPreferences] = useState({
    prefersReducedMotion: false,
    prefersDarkMode: false,
    prefersHighContrast: false,
  });

  useEffect(() => {
    // Detectar si prefiere movimiento reducido
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Detectar si prefiere modo oscuro
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Detectar si prefiere alto contraste
    const contrastQuery = window.matchMedia('(prefers-contrast: more)');

    const updatePreferences = () => {
      setPreferences({
        prefersReducedMotion: motionQuery.matches,
        prefersDarkMode: darkQuery.matches,
        prefersHighContrast: contrastQuery.matches,
      });
    };

    // Escuchar cambios
    motionQuery.addEventListener('change', updatePreferences);
    darkQuery.addEventListener('change', updatePreferences);
    contrastQuery.addEventListener('change', updatePreferences);

    return () => {
      motionQuery.removeEventListener('change', updatePreferences);
      darkQuery.removeEventListener('change', updatePreferences);
      contrastQuery.removeEventListener('change', updatePreferences);
    };
  }, []);

  return preferences;
};

// Uso: Auto-aplicar preferencias del SO
function App() {
  const sysPrefs = useSystemAccessibility();

  useEffect(() => {
    if (sysPrefs.prefersHighContrast) {
      // Auto-activar alto contraste
      document.documentElement.classList.add('accessibility-high-contrast');
    }
    if (sysPrefs.prefersReducedMotion) {
      // Auto-detener animaciones
      document.documentElement.classList.add('accessibility-no-animations');
    }
  }, [sysPrefs]);

  return <AccessibilityMenu />;
}

/**
 * EJEMPLO 4: Crear Botones de Accesibilidad Predefinidos
 * 
 * Perfiles rápidos para usuarios con necesidades específicas:
 */

// archivo: src/components/AccessibilityProfiles.jsx
export const AccessibilityProfiles = ({ onApply }) => {
  const profiles = {
    lowVision: {
      name: 'Baja Visión',
      settings: {
        fontSize: 150,
        contrast: 'high',
        lineHeight: 1.8,
        largeCursor: true,
      },
    },
    dyslexia: {
      name: 'Dislexia',
      settings: {
        fontSize: 120,
        dyslexiaFont: true,
        letterSpacing: 3,
        lineHeight: 2,
        stopAnimations: true,
      },
    },
    blindness: {
      name: 'Ceguera (Lector Pantalla)',
      settings: {
        fontSize: 100,
        highlightHeadings: true,
        highlightLinks: true,
        stopAnimations: true,
      },
    },
    photosensitivity: {
      name: 'Fotosensibilidad',
      settings: {
        stopAnimations: true,
        contrast: 'grayscale',
        fontSize: 100,
      },
    },
    colorblindness: {
      name: 'Daltonismo',
      settings: {
        contrast: 'grayscale',
        highlightLinks: true,
        highlightHeadings: true,
      },
    },
  };

  return (
    <div className="accessibility-profiles">
      <h4>Perfiles Rápidos</h4>
      {Object.entries(profiles).map(([key, profile]) => (
        <button
          key={key}
          onClick={() => onApply(profile.settings)}
          className="profile-button"
        >
          {profile.name}
        </button>
      ))}
    </div>
  );
};

/**
 * EJEMPLO 5: Validar Contraste WCAG
 * 
 * Función para verificar si un color cumple WCAG:
 */

// archivo: src/utils/contrastValidator.js

/**
 * Calcula el ratio de contraste entre dos colores
 * @param {string} color1 - Color en formato hex (ej: #ffffff)
 * @param {string} color2 - Color en formato hex
 * @returns {number} Ratio de contraste (1-21)
 */
export const getContrastRatio = (color1, color2) => {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Calcula la luminancia relativa de un color
 */
function getRelativeLuminance(hex) {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;

  const luminance = (a) => {
    a = a / 255;
    return a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  };

  return 0.2126 * luminance(r) + 0.7152 * luminance(g) + 0.0722 * luminance(b);
}

/**
 * Verifica si el contraste cumple WCAG AA (4.5:1 para texto normal)
 */
export const meetsWCAGAA = (color1, color2) => {
  return getContrastRatio(color1, color2) >= 4.5;
};

/**
 * Verifica si el contraste cumple WCAG AAA (7:1 para texto normal)
 */
export const meetsWCAGAAA = (color1, color2) => {
  return getContrastRatio(color1, color2) >= 7;
};

// Uso:
import { meetsWCAGAA, getContrastRatio } from '../utils/contrastValidator';

function ColorChecker() {
  const fgColor = '#0066cc';
  const bgColor = '#ffffff';
  const ratio = getContrastRatio(fgColor, bgColor);
  const meetsStandard = meetsWCAGAA(fgColor, bgColor);
  
  return (
    <div>
      <p>Ratio de contraste: {ratio.toFixed(2)}</p>
      <p>Cumple WCAG AA: {meetsStandard ? '✓' : '✗'}</p>
    </div>
  );
}

/**
 * EJEMPLO 6: Integración con Analytics
 * 
 * Seguimiento de uso de funciones de accesibilidad:
 */

// archivo: src/hooks/useAccessibilityAnalytics.js
export const useAccessibilityAnalytics = () => {
  const trackAccessibilityUsage = (feature, action) => {
    // Enviar a tu sistema de analytics
    if (window.gtag) {
      window.gtag('event', 'accessibility_feature', {
        feature: feature,
        action: action,
        timestamp: new Date().toISOString(),
      });
    } else {
      console.log(`Analytics: ${feature} - ${action}`);
    }
  };

  return { trackAccessibilityUsage };
};

// Uso en AccessibilityMenu.jsx:
const { trackAccessibilityUsage } = useAccessibilityAnalytics();

const increaseFontSize = () => {
  if (fontSize < 200) {
    setFontSize(fontSize + 10);
    trackAccessibilityUsage('fontSize', 'increase');
  }
};

/**
 * EJEMPLO 7: Dark Mode Mejorado
 * 
 * Integración con sistema de temas:
 */

// archivo: src/utils/themeManager.js
export const applyAccessibilityTheme = (theme) => {
  const root = document.documentElement;
  
  switch(theme) {
    case 'light':
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
      break;
    case 'dark':
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
      break;
    case 'auto':
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', isDark ? 'dark' : 'light');
      root.style.colorScheme = 'light dark';
      break;
  }
};

/**
 * EJEMPLO 8: Validador de Accesibilidad en Tiempo de Desarrollo
 * 
 * Verificar problemas de accesibilidad durante el desarrollo:
 */

// archivo: src/utils/a11yValidator.js
if (process.env.NODE_ENV === 'development') {
  // Solo en desarrollo
  
  export const validateA11y = () => {
    const issues = [];

    // 1. Verificar imágenes sin alt
    const imgsWithoutAlt = document.querySelectorAll('img:not([alt])');
    if (imgsWithoutAlt.length > 0) {
      issues.push(`${imgsWithoutAlt.length} imágenes sin atributo alt`);
    }

    // 2. Verificar botones sin texto accesible
    const buttonsWithoutText = document.querySelectorAll(
      'button:not([aria-label]):not([aria-labelledby]):empty'
    );
    if (buttonsWithoutText.length > 0) {
      issues.push(`${buttonsWithoutText.length} botones sin texto accesible`);
    }

    // 3. Verificar inputs sin labels
    const inputsWithoutLabel = document.querySelectorAll(
      'input:not([aria-label]):not([aria-labelledby]):not([id])'
    );
    if (inputsWithoutLabel.length > 0) {
      issues.push(`${inputsWithoutLabel.length} inputs sin label`);
    }

    // 4. Verificar heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;
    headings.forEach(h => {
      const level = parseInt(h.tagName[1]);
      if (level > lastLevel + 1) {
        issues.push(`Jerarquía de headings rota: ${h.tagName} después de H${lastLevel}`);
      }
      lastLevel = level;
    });

    if (issues.length > 0) {
      console.warn('⚠️ Problemas de accesibilidad encontrados:');
      issues.forEach(issue => console.warn(`  - ${issue}`));
    } else {
      console.log('✓ No hay problemas de accesibilidad detectados');
    }

    return issues;
  };

  // Ejecutar al cargar la página
  window.addEventListener('load', validateA11y);
}

// Uso:
import { validateA11y } from '../utils/a11yValidator';
validateA11y();

/**
 * EJEMPLO 9: Exportar/Importar Preferencias
 * 
 * Permitir usuarios descargar y compartir sus configuraciones:
 */

export const exportAccessibilitySettings = () => {
  const settings = localStorage.getItem('accessibilitySettings');
  
  if (!settings) {
    alert('No hay configuraciones para exportar');
    return;
  }

  const dataStr = JSON.stringify(JSON.parse(settings), null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  const exportFileDefaultName = `accessibility-settings-${new Date().toISOString().split('T')[0]}.json`;

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

export const importAccessibilitySettings = (file) => {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      const settings = JSON.parse(e.target.result);
      localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
      window.location.reload(); // Recargar para aplicar
    } catch (error) {
      alert('Error al importar archivo');
      console.error(error);
    }
  };

  reader.readAsText(file);
};

/**
 * EJEMPLO 10: Notificaciones de Accesibilidad
 * 
 * Avisar a usuarios sobre mejoras de accesibilidad:
 */

export const showAccessibilityTip = (tip) => {
  const message = document.createElement('div');
  message.className = 'accessibility-tip';
  message.setAttribute('role', 'alert');
  message.setAttribute('aria-live', 'polite');
  message.textContent = tip;

  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 5000);
};

// CSS para accessibility-tip:
// .accessibility-tip {
//   position: fixed;
//   bottom: 80px;
//   right: 20px;
//   background: #28a745;
//   color: white;
//   padding: 12px 16px;
//   border-radius: 8px;
//   box-shadow: 0 4px 12px rgba(0,0,0,0.1);
//   animation: slideUp 0.3s ease-in-out;
// }
// @keyframes slideUp {
//   from { transform: translateY(20px); opacity: 0; }
//   to { transform: translateY(0); opacity: 1; }
// }

---

## Conclusión

Estos ejemplos muestran cómo:

1. ✅ Reutilizar la lógica con hooks
2. ✅ Sincronizar con servidor para usuarios autenticados
3. ✅ Detectar preferencias del SO automáticamente
4. ✅ Crear perfiles rápidos para diferentes necesidades
5. ✅ Validar contraste WCAG
6. ✅ Integrar con analytics
7. ✅ Mejorar el sistema de temas
8. ✅ Validar accesibilidad durante desarrollo
9. ✅ Permitir exportar/importar configuraciones
10. ✅ Notificar a usuarios

¡Usa estos ejemplos para extender tu sistema de accesibilidad! ♿✨
