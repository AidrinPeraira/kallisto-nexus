import { env } from "@packages/config/env";
import { WinstonLogger } from "@packages/logger";
import { createApp } from "./app";

const logger = new WinstonLogger();
const app = createApp();
const PORT = env.PORT;

app.listen(PORT, () => {
  logger.info(`🚀 Kallisto Nexus API running on port ${PORT}`, {
    env: env.NODE_ENV,
    url: `http://localhost:${PORT}`,
  });
});
