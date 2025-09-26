import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { z } from "zod";
import { objectIdValidator } from "@/lib/utils";

const SuccessResponseSchema = z.object({
	status: z.literal("success"),
	upvotes: z.int(),
	downvotes: z.int(),
});

const ErrorResponseSchema = z.object({
	status: z.literal("error"),
	description: z.string(),
});

const ParamsSchema = z.object({
	id: objectIdValidator.describe("Report ID"),
});

const QueryParamsSchema = z.object({
	type: z.enum(["upvote", "downvote"]),
	// TODO: Extract onto own enum file if other files require this information
	action: z.enum(["add", "sub"]),
});

export const updateReportVotesRoute = createRoute({
	description: "Get all reports",
	path: "/{id}/vote",
	method: "post",
	request: {
		params: ParamsSchema,
		query: QueryParamsSchema,
	},
	tags: ["Reports"],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			SuccessResponseSchema,
			"Successfully retrieved report by id",
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

export type UpdateReportVotesRoute = typeof updateReportVotesRoute;
