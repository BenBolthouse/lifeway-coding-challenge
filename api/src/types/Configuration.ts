import { Types } from "lifeway-coding-challenge-shared";

export type Configuration = Types.SwapiClientConfiguration & {
  appName: string
  listenPort: number
  environment: string
  isDevelopment: boolean
  isTesting: boolean
  isProduction: boolean
}; // eslint-disable-line
