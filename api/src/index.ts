import { getConfig, getLogger } from "./config";
import { Cache, Clients } from "lifeway-coding-challenge-shared";
import express from "express";
import Routes from "./routes";
import cors from "cors";

const config = getConfig();
const logger = getLogger();
const app = express();

export const swapiCache = new Cache();
export const swapiClient = new Clients.SwapiClient(config, logger, swapiCache);

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["POST"],
}));
app.use(express.json());
app.use("/api", Routes);

app.listen(config.listenPort, () => {
  logger.info(`Application listening on http://localhost:${config.listenPort}/.`);
});
