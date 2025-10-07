/**
 * Sistema de logging de errores para la aplicación
 */

export enum LogLevel {
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
  DEBUG = "debug",
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  context?: string;
  timestamp: Date;
  error?: Error;
  metadata?: Record<string, any>;
}

class ErrorLogger {
  private logs: LogEntry[] = [];
  private maxLogs: number = 100;
  private isDevelopment: boolean = process.env.NODE_ENV === "development";

  /**
   * Registra un log entry
   */
  private log(
    level: LogLevel,
    message: string,
    context?: string,
    error?: Error,
    metadata?: Record<string, any>
  ) {
    const entry: LogEntry = {
      level,
      message,
      context,
      timestamp: new Date(),
      error,
      metadata,
    };

    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    this.consoleLog(entry);
    if (!this.isDevelopment) {
      this.sendToExternalService(entry);
    }
  }

  /**
   * Loguea en la consola del navegador
   */
  private consoleLog(entry: LogEntry) {
    const prefix = `[${entry.timestamp.toISOString()}]${
      entry.context ? ` [${entry.context}]` : ""
    }`;

    switch (entry.level) {
      case LogLevel.ERROR:
        console.error(prefix, entry.message, entry.error, entry.metadata);
        break;
      case LogLevel.WARN:
        console.warn(prefix, entry.message, entry.metadata);
        break;
      case LogLevel.INFO:
        console.info(prefix, entry.message, entry.metadata);
        break;
      case LogLevel.DEBUG:
        if (this.isDevelopment) {
          console.debug(prefix, entry.message, entry.metadata);
        }
        break;
    }
  }

  /**
   * Placeholder para envío a servicio externo de logging
   */
  private sendToExternalService(entry: LogEntry) {}

  /**
   * Métodos públicos para diferentes niveles de log
   */
  public info(
    message: string,
    context?: string,
    metadata?: Record<string, any>
  ) {
    this.log(LogLevel.INFO, message, context, undefined, metadata);
  }

  public warn(
    message: string,
    context?: string,
    metadata?: Record<string, any>
  ) {
    this.log(LogLevel.WARN, message, context, undefined, metadata);
  }

  public error(
    message: string,
    context?: string,
    error?: Error,
    metadata?: Record<string, any>
  ) {
    this.log(LogLevel.ERROR, message, context, error, metadata);
  }

  public debug(
    message: string,
    context?: string,
    metadata?: Record<string, any>
  ) {
    this.log(LogLevel.DEBUG, message, context, undefined, metadata);
  }

  /**
   * Obtiene los logs almacenados
   */
  public getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Limpia los logs almacenados
   */
  public clearLogs() {
    this.logs = [];
  }

  /**
   * Obtiene estadísticas de errores
   */
  public getStats() {
    const stats = {
      total: this.logs.length,
      byLevel: {
        [LogLevel.ERROR]: 0,
        [LogLevel.WARN]: 0,
        [LogLevel.INFO]: 0,
        [LogLevel.DEBUG]: 0,
      },
      recent: this.logs.slice(-10),
    };

    this.logs.forEach((log) => {
      stats.byLevel[log.level]++;
    });

    return stats;
  }
}

export const logger = new ErrorLogger();
export const logInfo = (
  message: string,
  context?: string,
  metadata?: Record<string, any>
) => logger.info(message, context, metadata);

export const logWarn = (
  message: string,
  context?: string,
  metadata?: Record<string, any>
) => logger.warn(message, context, metadata);

export const logError = (
  message: string,
  context?: string,
  error?: Error,
  metadata?: Record<string, any>
) => logger.error(message, context, error, metadata);

export const logDebug = (
  message: string,
  context?: string,
  metadata?: Record<string, any>
) => logger.debug(message, context, metadata);

/**
 * Error boundary helper para React components
 */
export const logComponentError = (
  error: Error,
  errorInfo: any,
  componentName?: string
) => {
  logger.error(
    `React component error${componentName ? ` in ${componentName}` : ""}`,
    "React",
    error,
    { errorInfo, componentStack: errorInfo.componentStack }
  );
};

export const setupGlobalErrorHandlers = () => {
  window.addEventListener("error", (event) => {
    logger.error("Uncaught JavaScript error", "Global", event.error, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      message: event.message,
    });
  });
  window.addEventListener("unhandledrejection", (event) => {
    logger.error(
      "Unhandled promise rejection",
      "Global",
      event.reason instanceof Error
        ? event.reason
        : new Error(String(event.reason)),
      { reason: event.reason }
    );
  });
};
