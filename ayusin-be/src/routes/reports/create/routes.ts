import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { z } from "zod";
import { ReportSchema } from "../schema";

const RequestSchema = ReportSchema.pick({
	title: true,
	description: true,
	category: true,
	scope: true,
	location: true,
});

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
	request: {
		body: {
			content: {
				"application/json": {
					schema: RequestSchema,
				},
			},
		},
	},
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
			"Bad request data",
		),
		[HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
			ErrorResponseSchema,
			"Internal server error",
		),
	},
});

export type CreateReportRoute = typeof createReportRoute;
