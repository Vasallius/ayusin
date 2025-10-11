import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";

import { pinoLogger } from "@/middleware/pino-logger";

import type { AppBindings, AppOpenAPI } from "./types";
import { clerkAuth } from "@/middleware/clerk-auth";

export function createRouter() {
	return new OpenAPIHono<AppBindings>({
		strict: false,
		defaultHook,
	});
}

export function createClerkRouter() {
	const app = new OpenAPIHono<AppBindings>({
		strict: false,
		defaultHook,
	});
	app.use("*", clerkAuth());
	return app;
}

export default function createApp() {
	const app = createRouter();
	app.use(serveEmojiFavicon("📝"));
	app.use(pinoLogger());

	app.notFound(notFound);
	app.onError(onError);
	return app;
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
	return createApp().route("/", router);
}
