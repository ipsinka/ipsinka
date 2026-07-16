import { Cita } from '@/types/citas';

/**
 * CITAS PERMANENTES PARA PRODUCCIÓN
 *
 * Estas citas están hardcodeadas en el código y siempre estarán disponibles
 * cuando subas el proyecto a Vercel o cualquier otro servidor.
 *
 * IMPORTANTE:
 * - Estas citas NO se pueden eliminar desde la interfaz
 * - Sirven como datos de ejemplo permanentes
 * - Para agregar más citas aquí, copia y pega desde localStorage
 */

export const citasProduccion: Cita[] = [
  // ============================================
  // AGREGAR CITAS AQUÍ
  // Copia y pega el formato de una cita (ver instrucciones al final)
  // ============================================
];

/**
 * Función para combinar citas de producción con las del localStorage
 * Las citas de producción siempre se muestran primero
 */
export const obtenerTodasLasCitas = (): Cita[] => {
  if (typeof window === 'undefined') return citasProduccion;

  try {
    const citasLocal = localStorage.getItem('citas-inga');
    const citasLocalStorage: Cita[] = citasLocal ? JSON.parse(citasLocal) : [];

    // Combinar citas: producción + localStorage
    // Filtrar duplicados por ID
    const citasCombinadas = [...citasProduccion];

    citasLocalStorage.forEach(citaLocal => {
      // Solo agregar si no existe ya (no es de producción)
      if (!citasCombinadas.some(c => c.id === citaLocal.id)) {
        citasCombinadas.push(citaLocal);
      }
    });

    return citasCombinadas;
  } catch (error) {
    console.error('Error al obtener citas:', error);
    return citasProduccion;
  }
};

/**
 * IDs de citas que NO se pueden eliminar (las de producción)
 */
export const citasProtegidas = citasProduccion.map(c => c.id);

/**
 * Verificar si una cita es de producción (no se puede eliminar)
 */
export const esCitaDeProduccion = (citaId: string): boolean => {
  return citasProtegidas.includes(citaId);
};

/**
 * INSTRUCCIONES PARA EXPORTAR CITAS DESDE LOCALHOST A PRODUCCIÓN:
 *
 * 1. Crea todas las citas que quieras en /admin-citas en tu localhost
 *
 * 2. Abre la consola del navegador (F12) y ejecuta:
 *    const citas = JSON.parse(localStorage.getItem('citas-inga') || '[]');
 *    console.log(JSON.stringify(citas, null, 2));
 *
 * 3. Copia el resultado
 *
 * 4. Convierte cada cita al formato de arriba, cambiando:
 *    - El ID a 'prod-XXX'
 *    - La fecha a obtenerFechaDesdeHoy(X) según corresponda
 *
 * 5. Pega las citas aquí en el array citasProduccion
 *
 * 6. Haz commit y push a tu repositorio
 *
 * 7. Vercel automáticamente detectará los cambios y las citas estarán disponibles
 */
