import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { z } from "zod";
import { ReportSchema } from "../schema";

const SuccessResponseSchema = z.object({
	status: z.literal("success"),
	...ReportSchema.shape,
});

const ErrorResponseSchema = z.object({
	status: z.literal("error"),
	description: z.string(),
});

export const createReportRoute = createRoute({
	description: "Create a new report",
	path: "/",
	method: "post",
	tags: ["Reports"],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			SuccessResponseSchema,
			"Successfully created a new report",
		),
		[HttpStatusCodes.UNAUTHORIZED]: jsonContent(
			ErrorResponseSchema,
			"Unauthorized request",
		),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			ErrorResponseSchema,
			"Unauthorized request",
		),
	},
});

export type CreateReportRoute = typeof createReportRoute;
