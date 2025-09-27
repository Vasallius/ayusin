import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { z } from "zod";
import { objectIdValidator } from "@/lib/utils";

const SuccessResponseSchema = z.object({
	status: z.literal("success"),
	id: z.string().describe("Comment ID"),
	text: z.string().describe("Comment body"),
});

const ErrorResponseSchema = z.object({
	status: z.literal("error"),
	description: z.string(),
});

const ParamsSchema = z.object({
	// From route /reports/{id}/comments
	id: objectIdValidator.describe("Report ID"),
});

const BodySchema = z.object({
	// TODO: Add max length?
	text: z.string().describe("Comment body"),
});

export const createReportCommentRoute = createRoute({
	description: "Create a comment on a specific report",
	path: "/",
	method: "post",
	request: {
		params: ParamsSchema,
		body: {
			content: {
				"application/json": {
					schema: BodySchema,
				},
			},
		},
	},
	tags: ["Reports"],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			SuccessResponseSchema,
			"Successful request",
		),
		[HttpStatusCodes.UNAUTHORIZED]: jsonContent(
			ErrorResponseSchema,
			"Unauthorized request",
		),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(
			ErrorResponseSchema,
			"Report not found",
		),
		[HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
			ErrorResponseSchema,
			"Internal server error",
		),
	},
});

export type CreateReportCommentRoute = typeof createReportCommentRoute;
