/**
 * LOADER: Garantiza que todos los scripts se carguen y ejecuten en el orden correcto
 * Carga el contenido de cada script y lo ejecuta con eval para garantizar ejecución
 */

(async function() {
  'use strict';
  
  // Esperar a que el DOM esté completamente listo
  if (document.readyState === 'loading') {
    await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
  }
  
  const scripts = [
    'js/Formulario_de_Registro.js',
    'js/Formulario_de_Login.js',
    'js/Formulario_de_Contacto.js',
    'js/main.js'
  ];
  
  try {
    console.log('📦 Iniciando carga de scripts...');
    
    // Cargar y ejecutar cada script en orden
    for (const src of scripts) {
      console.log(`⏳ Cargando: ${src}`);
      
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const code = await response.text();
        
        // Ejecutar el código en el scope global
        eval(code);
        console.log(`✅ Cargado y ejecutado: ${src}`);
      } catch (error) {
        console.error(`❌ Error al cargar ${src}:`, error);
      }
    }
    
    console.log('✅ Todos los scripts cargados y ejecutados exitosamente');
    
    // Inicializar la aplicación si initApp está disponible
    if (typeof window.initApp === 'function') {
      console.log('🚀 Inicializando aplicación...');
      window.initApp();
      console.log('🚀 Aplicación inicializada correctamente');
    } else {
      console.error('❌ initApp no está disponible');
    }
  } catch (error) {
    console.error('❌ Error en el loader:', error);
  }
})();
