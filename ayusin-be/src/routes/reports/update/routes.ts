import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { z } from "zod";
import { objectIdValidator } from "@/lib/utils";
import { ReportSchema } from "../schema";

const SuccessResponseSchema = z.object({
	status: z.literal("success"),
	...ReportSchema.shape,
});

const ErrorResponseSchema = z.object({
	status: z.literal("error"),
	description: z.string(),
});

const ParamsSchema = z.object({
	id: objectIdValidator.describe("Report ID"),
});

const RequestBodySchema = ReportSchema.pick({
	title: true,
	description: true,
	category: true,
	scope: true,
	labels: true,
	location: true,
}).partial();

export const updateReportRoute = createRoute({
	description: "Get all reports",
	path: "/:id",
	method: "patch",
	request: {
		params: ParamsSchema,
		body: {
			content: {
				"application/json": {
					schema: RequestBodySchema,
				},
			},
		},
	},
	tags: ["Reports"],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			SuccessResponseSchema,
			"Successfully updated report",
		),
		[HttpStatusCodes.UNAUTHORIZED]: jsonContent(
			ErrorResponseSchema,
			"Unauthorized request",
		),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			ErrorResponseSchema,
			"Unprocessable Entity",
		),
		[HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
			ErrorResponseSchema,
			"Internal Server Error",
		),
	},
});

export type UpdateReportRoute = typeof updateReportRoute;
