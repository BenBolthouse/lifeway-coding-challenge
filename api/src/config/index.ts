import "dotenv";
import { Configuration, Environments } from "../types";
import { createLogger, format, Logger, transports } from "winston";

let logger: Logger | undefined;

function validateConfig(): Configuration {
  let appName: string;
  let environment: Environments;
  let isDevelopment: boolean = false;
  let isProduction: boolean = false;
  let isTesting: boolean = false;
  let listenPort: number;
  let swapiBaseUrl: string;

  try {
    listenPort = parseInt(process.env.LISTEN_PORT!);

    switch (process.env.NODE_ENV) {
    case Environments.Development:
      isDevelopment = true;
      break;
    case Environments.Production:
      isProduction = true;
      break;
    case Environments.Testing:
      isTesting = true;
      break;
    default: throw new Error();
    }

    environment = process.env.NODE_ENV;

    if (typeof process.env.APP_NAME === "string") {
      appName = process.env.APP_NAME;
    }
    else {
      throw new Error();
    }

    if (typeof process.env.SWAPI_BASE_URL === "string") {
      swapiBaseUrl = process.env.SWAPI_BASE_URL;
    }
    else {
      throw new Error();
    }
  }
  catch {
    throw new Error("Configuration is invalid.");
  }

  return {
    appName,
    environment,
    isDevelopment,
    isProduction,
    isTesting,
    listenPort,
    swapiBaseUrl,
  };
}

export function getConfig() {
  return validateConfig();
}

export function getLogger() {
  if (!logger) {
    const config = validateConfig();

    logger = createLogger({
      format: format.json(),
      defaultMeta: {
        service: config.appName,
        environment: config.environment,
      },
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.prettyPrint({ depth: 10, colorize: true }),
          ),
          level: config.isDevelopment ? "debug" : "none",
        }),
        new transports.Console({
          format: format.combine(
            format.splat(),
          ),
          level: config.isProduction ? "debug" : "none",
        }),
      ]
    });
  }

  return logger;
}
