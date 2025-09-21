import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import { createRouter } from "@/lib/create-app";

const healthyResponse = z
	.object({
		message: z
			.string()
			.describe("A message to indicate the health of the service."),
	})
	.openapi({
		example: {
			message: "Healthy",
		},
	});

const router = createRouter().openapi(
	createRoute({
		tags: ["Index"],
		method: "get",
		path: "/",
		responses: {
			[HttpStatusCodes.OK]: jsonContent(healthyResponse, "Healthy Response"),
		},
	}),
	(c) => {
		return c.json(
			{
				message: "Healthy",
			},
			HttpStatusCodes.OK,
		);
	},
);

export default router;
