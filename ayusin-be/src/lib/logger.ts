// These loggers are meant to used outside Hono. For logging within Hono, use c.var.logger instead!

import env from "@/env";
import pino from "pino";
import pretty from "pino-pretty";

// TODO: Unify pino-logger from middlewares to use this?
export const logger = pino(
	{
		level: env?.LOG_LEVEL || "info",
	},
	process.env.NODE_ENV === "production" ? undefined : pretty(),
);
