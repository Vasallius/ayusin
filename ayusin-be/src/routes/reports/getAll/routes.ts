import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { z } from "zod";
import { ReportSchema } from "../schema";

const SuccessResponseSchema = z.object({
	status: z.literal("success"),
	reports: z.array(ReportSchema),
});

const ErrorResponseSchema = z.object({
	status: z.literal("error"),
	description: z.string(),
});

const positiveIntValidator = z
	.string()
	.optional()
	.refine(
		(s) => {
			if (s === undefined) return true;
			try {
				const n = BigInt(s);
				return n > BigInt(0);
			} catch {
				return false;
			}
		},
		{ message: "query parameter must be a positive integer greater than 0" },
	)
	.transform((s) => (s === undefined ? undefined : Number(s)));

const RequestQueryParamsSchema = z
	.object({
		duration: positiveIntValidator.describe("Filters in the last n days"),
		// TODO: Enum ? id based?
		department: z
			.string()
			.optional()
			.describe("Filters reports depending on which department it is assigned"),
		label: z.string().optional().describe("Filter by label"),
		// TODO: Again, enums? Also, since it can be used multiple times what schema type should it use?
		// z.array(z.string)?
		categories: z.string().optional().describe("Filter by category"),
		// TODO: enums?
		sort_by: z
			.enum(["created_at", "upvotes"])
			.optional()
			.transform((arg) => (arg === "created_at" ? "createdAt" : arg))
			.describe("Sort by a variable"),
		order_by: z
			.enum(["asc", "desc"])
			.default("asc")
			.describe(
				"What to order the sort in 'sort_by' by: ascending or descending",
			),
		location: z
			.string()
			.optional()
			.describe("Location coordinate (longitude:x, latitude:y)"),
		// TODO: add refinement to require location when radius is given.
		radius: z.number().optional().describe("How many meters from location"),
		limit: positiveIntValidator.describe("How many reports to return"),
	})
	.refine((data) => data.sort_by !== undefined || data.order_by === undefined, {
		message: "'order_by' can only be set if 'sort_by' is provided",
		path: ["order_by"],
	});

export const getAllReportsRoute = createRoute({
	description: "Get all reports",
	path: "/",
	request: {
		query: RequestQueryParamsSchema,
	},
	method: "get",
	tags: ["Reports"],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			SuccessResponseSchema,
			"Successfully retrieved all reports",
		),
		[HttpStatusCodes.UNAUTHORIZED]: jsonContent(
			ErrorResponseSchema,
			"Unauthorized request",
		),
		[HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
			ErrorResponseSchema,
			"Internal server error",
		),
	},
});

export type GetAllReportsRoute = typeof getAllReportsRoute;
