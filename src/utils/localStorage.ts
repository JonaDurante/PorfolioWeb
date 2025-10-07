/**
 * Utilidades seguras para localStorage con manejo de errores
 */
export interface StorageResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Obtiene un item del localStorage de manera segura
 * @param key - La clave del item a obtener
 * @param defaultValue - Valor por defecto si no existe o hay error
 * @returns Resultado con el valor o error
 */
export function getStorageItem<T>(
  key: string,
  defaultValue?: T
): StorageResult<T> {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return {
        success: false,
        error: "localStorage is not available",
        data: defaultValue,
      };
    }

    const item = localStorage.getItem(key);

    if (item === null) {
      return {
        success: true,
        data: defaultValue,
      };
    }

    try {
      const parsed = JSON.parse(item);
      return {
        success: true,
        data: parsed,
      };
    } catch {
      return {
        success: true,
        data: item as unknown as T,
      };
    }
  } catch (error) {
    console.warn(`Error accessing localStorage key "${key}":`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      data: defaultValue,
    };
  }
}

/**
 * Guarda un item en localStorage de manera segura
 * @param key - La clave del item a guardar
 * @param value - El valor a guardar
 * @returns Resultado de la operación
 */
export function setStorageItem<T>(key: string, value: T): StorageResult<T> {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return {
        success: false,
        error: "localStorage is not available",
      };
    }

    const stringValue =
      typeof value === "string" ? value : JSON.stringify(value);

    localStorage.setItem(key, stringValue);

    return {
      success: true,
      data: value,
    };
  } catch (error) {
    console.warn(`Error saving to localStorage key "${key}":`, error);

    if (error instanceof Error && error.name === "QuotaExceededError") {
      console.warn("localStorage quota exceeded, consider cleaning old data");
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Remueve un item del localStorage de manera segura
 * @param key - La clave del item a remover
 * @returns Resultado de la operación
 */
export function removeStorageItem(key: string): StorageResult<void> {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return {
        success: false,
        error: "localStorage is not available",
      };
    }

    localStorage.removeItem(key);
    return { success: true };
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Verifica si localStorage está disponible
 * @returns true si localStorage está disponible
 */
export function isStorageAvailable(): boolean {
  try {
    if (typeof window === "undefined") return false;

    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}
