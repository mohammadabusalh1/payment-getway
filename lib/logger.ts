export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  CRITICAL = 4,
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  category?: string;
  userId?: string;
  transactionId?: string;
  metadata?: Record<string, unknown>;
}

class Logger {
  private static instance: Logger;
  private logLevel: LogLevel = LogLevel.INFO;
  private logs: LogEntry[] = [];
  private maxLogSize: number = 1000; // Maximum number of logs to keep in memory

  private constructor() {
    // Private constructor for singleton pattern
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.logLevel;
  }

  private formatMessage(entry: LogEntry): string {
    const levelStr = LogLevel[entry.level].padEnd(8);
    const category = entry.category ? `[${entry.category}]` : "";
    const userId = entry.userId ? `[User:${entry.userId}]` : "";
    const transactionId = entry.transactionId
      ? `[Tx:${entry.transactionId}]`
      : "";

    return `${entry.timestamp} ${levelStr} ${category}${userId}${transactionId} ${entry.message}`;
  }

  private log(
    level: LogLevel,
    message: string,
    options?: {
      category?: string;
      userId?: string;
      transactionId?: string;
      metadata?: Record<string, unknown>;
    }
  ): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const entry: LogEntry = {
      timestamp: this.formatTimestamp(),
      level,
      message,
      category: options?.category,
      userId: options?.userId,
      transactionId: options?.transactionId,
      metadata: options?.metadata,
    };

    // Add to in-memory log store
    this.logs.push(entry);

    // Maintain max log size
    if (this.logs.length > this.maxLogSize) {
      this.logs.shift();
    }

    // Console output with appropriate styling
    const formattedMessage = this.formatMessage(entry);

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(`🔍 ${formattedMessage}`, options?.metadata || "");
        break;
      case LogLevel.INFO:
        console.info(`ℹ️ ${formattedMessage}`, options?.metadata || "");
        break;
      case LogLevel.WARN:
        console.warn(`⚠️ ${formattedMessage}`, options?.metadata || "");
        break;
      case LogLevel.ERROR:
        console.error(`❌ ${formattedMessage}`, options?.metadata || "");
        break;
      case LogLevel.CRITICAL:
        console.error(`🚨 ${formattedMessage}`, options?.metadata || "");
        break;
    }

    // In production, you might want to send critical logs to external services
    if (level === LogLevel.CRITICAL && typeof window === "undefined") {
      this.handleCriticalLog(entry);
    }
  }

  private handleCriticalLog(entry: LogEntry): void {
    // This is where you'd integrate with external logging services
    // For now, we'll just ensure it's logged to console
    console.error("🚨 CRITICAL LOG:", entry);
  }

  // Public logging methods
  public debug(
    message: string,
    options?: {
      category?: string;
      userId?: string;
      transactionId?: string;
      metadata?: Record<string, unknown>;
    }
  ): void {
    this.log(LogLevel.DEBUG, message, options);
  }

  public info(
    message: string,
    options?: {
      category?: string;
      userId?: string;
      transactionId?: string;
      metadata?: Record<string, unknown>;
    }
  ): void {
    this.log(LogLevel.INFO, message, options);
  }

  public warn(
    message: string,
    options?: {
      category?: string;
      userId?: string;
      transactionId?: string;
      metadata?: Record<string, unknown>;
    }
  ): void {
    this.log(LogLevel.WARN, message, options);
  }

  public error(
    message: string,
    options?: {
      category?: string;
      userId?: string;
      transactionId?: string;
      metadata?: Record<string, unknown>;
    }
  ): void {
    this.log(LogLevel.ERROR, message, options);
  }

  public critical(
    message: string,
    options?: {
      category?: string;
      userId?: string;
      transactionId?: string;
      metadata?: Record<string, unknown>;
    }
  ): void {
    this.log(LogLevel.CRITICAL, message, options);
  }

  // Payment gateway specific logging methods
  public logPayment(
    action: string,
    options: {
      userId?: string;
      transactionId?: string;
      amount?: number;
      currency?: string;
      paymentMethod?: string;
      status?: string;
      metadata?: Record<string, unknown>;
    }
  ): void {
    this.info(`Payment ${action}`, {
      category: "PAYMENT",
      userId: options.userId,
      transactionId: options.transactionId,
      metadata: {
        amount: options.amount,
        currency: options.currency,
        paymentMethod: options.paymentMethod,
        status: options.status,
        ...options.metadata,
      },
    });
  }

  public logAuth(
    action: string,
    options: {
      userId?: string;
      email?: string;
      success?: boolean;
      reason?: string;
      metadata?: Record<string, unknown>;
    }
  ): void {
    const level = options.success ? LogLevel.INFO : LogLevel.WARN;
    this.log(level, `Auth ${action}`, {
      category: "AUTH",
      userId: options.userId,
      metadata: {
        email: options.email,
        success: options.success,
        reason: options.reason,
        ...options.metadata,
      },
    });
  }

  public logSecurity(
    event: string,
    options: {
      userId?: string;
      ipAddress?: string;
      userAgent?: string;
      severity?: "low" | "medium" | "high" | "critical";
      metadata?: Record<string, unknown>;
    }
  ): void {
    const level =
      options.severity === "critical"
        ? LogLevel.CRITICAL
        : options.severity === "high"
        ? LogLevel.ERROR
        : options.severity === "medium"
        ? LogLevel.WARN
        : LogLevel.INFO;

    this.log(level, `Security event: ${event}`, {
      category: "SECURITY",
      userId: options.userId,
      metadata: {
        ipAddress: options.ipAddress,
        userAgent: options.userAgent,
        severity: options.severity,
        ...options.metadata,
      },
    });
  }

  // Utility methods
  public getLogs(filter?: {
    level?: LogLevel;
    category?: string;
    userId?: string;
    startDate?: Date;
    endDate?: Date;
  }): LogEntry[] {
    let filteredLogs = [...this.logs];

    if (filter) {
      if (filter.level !== undefined) {
        filteredLogs = filteredLogs.filter((log) => log.level >= filter.level!);
      }
      if (filter.category) {
        filteredLogs = filteredLogs.filter(
          (log) => log.category === filter.category
        );
      }
      if (filter.userId) {
        filteredLogs = filteredLogs.filter(
          (log) => log.userId === filter.userId
        );
      }
      if (filter.startDate) {
        filteredLogs = filteredLogs.filter(
          (log) => new Date(log.timestamp) >= filter.startDate!
        );
      }
      if (filter.endDate) {
        filteredLogs = filteredLogs.filter(
          (log) => new Date(log.timestamp) <= filter.endDate!
        );
      }
    }

    return filteredLogs;
  }

  public clearLogs(): void {
    this.logs = [];
  }

  public exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

// Export singleton instance
export const logger = Logger.getInstance();

// Development mode configuration
if (process.env.NODE_ENV === "development") {
  logger.setLogLevel(LogLevel.DEBUG);
} else {
  logger.setLogLevel(LogLevel.INFO);
}
