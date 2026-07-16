import Swal, { type SweetAlertOptions } from "sweetalert2";

/**
 * Wrappers de SweetAlert2 con estilo coherente al proyecto
 * (verde institucional emerald y soporte para modo oscuro).
 *
 * Reemplazan los window.alert() / window.confirm() nativos.
 */

const EMERALD = "#059669"; // emerald-600
const RED = "#dc2626"; // red-600
const GRAY = "#64748b"; // slate-500

/** Aplica colores según el modo claro/oscuro activo. */
function themedOptions(): SweetAlertOptions {
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return {
    background: isDark ? "#1e293b" : "#ffffff", // slate-800 / white
    color: isDark ? "#f1f5f9" : "#0f172a", // slate-100 / slate-900
  };
}

/**
 * Diálogo de confirmación para acciones destructivas (borrar, revocar, etc.).
 * Devuelve `true` si el usuario confirma.
 *
 * Uso: `if (!(await confirmDelete("¿Eliminar el evento X?"))) return;`
 */
export async function confirmDelete(
  text: string,
  options: {
    title?: string;
    confirmButtonText?: string;
  } = {}
): Promise<boolean> {
  const result = await Swal.fire({
    title: options.title ?? "¿Estás seguro?",
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: options.confirmButtonText ?? "Sí, eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: RED,
    cancelButtonColor: GRAY,
    reverseButtons: true,
    focusCancel: true,
    ...themedOptions(),
  });
  return result.isConfirmed;
}

/**
 * Diálogo de confirmación genérico (no destructivo).
 * Devuelve `true` si el usuario confirma.
 */
export async function confirmAction(
  text: string,
  options: {
    title?: string;
    confirmButtonText?: string;
  } = {}
): Promise<boolean> {
  const result = await Swal.fire({
    title: options.title ?? "Confirmar",
    text,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: options.confirmButtonText ?? "Aceptar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: EMERALD,
    cancelButtonColor: GRAY,
    reverseButtons: true,
    ...themedOptions(),
  });
  return result.isConfirmed;
}

/** Aviso de error. */
export function showError(text: string, title = "Error"): Promise<unknown> {
  return Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonText: "Entendido",
    confirmButtonColor: EMERALD,
    ...themedOptions(),
  });
}

/** Aviso de éxito (toast discreto en la esquina). */
export function showSuccess(title: string): Promise<unknown> {
  return Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    ...themedOptions(),
  });
}

/** Aviso de advertencia. */
export function showWarning(text: string, title = "Atención"): Promise<unknown> {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    confirmButtonText: "Entendido",
    confirmButtonColor: EMERALD,
    ...themedOptions(),
  });
}
