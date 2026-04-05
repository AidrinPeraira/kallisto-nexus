import { createLogger, format, transports } from "winston";
import { ILogger } from "./ILogger";

const { combine, timestamp, printf, errors, colorize, json } = format;

// Pretty console format (for dev)
const consoleFormat = printf(
  ({ level, message, timestamp, stack, ...meta }) => {
    return `${timestamp} [${level}]: ${stack || message} ${
      Object.keys(meta).length ? JSON.stringify(meta) : ""
    }`;
  },
);

export class WinstonLogger implements ILogger {
  private logger;

  constructor() {
    this.logger = createLogger({
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
      format: combine(
        timestamp(),
        errors({ stack: true }), // logs stack traces
      ),
      transports: [
        new transports.Console({
          format:
            process.env.NODE_ENV === "production"
              ? combine(json()) // structured logs in prod
              : combine(colorize(), consoleFormat), // readable logs in dev
        }),
      ],
    });
  }

  info(message: string, meta?: any): void {
    this.logger.info(message, meta);
  }

  error(message: string, meta?: any): void {
    this.logger.error(message, meta);
  }

  warn(message: string, meta?: any): void {
    this.logger.warn(message, meta);
  }

  debug(message: string, meta?: any): void {
    this.logger.debug(message, meta);
  }
}
