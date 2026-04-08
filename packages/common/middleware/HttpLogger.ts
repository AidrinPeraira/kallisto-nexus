import morgan from "morgan";
import { ILogger } from "@packages/logger";

/**
 * Creates a morgan middleware that streams logs to our custom Winston logger
 */
export const createHttpLogger = (logger: ILogger) => {
  return morgan(process.env.NODE_ENV === "production" ? "combined" : "dev", {
    stream: {
      write: (message: string) => {
        logger.info(message.trim());
      },
    },
  });
};
