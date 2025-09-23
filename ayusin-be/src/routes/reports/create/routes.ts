import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { z } from "zod";
import { ReportSchema } from "../schema";

const RequestSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	category: z.string(),
	scope: z.enum(["Barangay", "City", "Province", "Regional", "National"]),
	location: z.object({
		x: z.float64(),
		y: z.float64(),
	}),
});

const SuccessResponseSchema = z.object({
	status: z.literal("success"),
	...ReportSchema.shape,
});

const ErrorResponseSchema = z.object({
	status: z.literal("error"),
	description: z.string(),
});

const RequestBodySchema = ReportSchema.pick({
	title: true,
	// NOTE: Routes document marks this as string | null which does not match other uses of ReportSchema (string, empty string if null);
	description: true,
	category: true,
	location: true,
}).safeExtend({
	// TODO: Set Scope Meaning via .describe()
	scope: z.string(),
	reported_by: z.string().describe("Citizen User ID"),
});

export const createReportRoute = createRoute({
	description: "Create a new report",
	path: "/",
	request: {
		body: {
			content: {
				"application/json": {
					schema: RequestBodySchema,
				},
			},
		},
		required: true,
	},
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
