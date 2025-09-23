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

const RequestQueryParamsSchema = z.object({
	duration: z.number().describe("Filters in the last n days"),
	// TODO: Enum ? id based?
	department: z
		.string()
		.describe("Filters reports depending on which department it is assigned"),
	label: z.string().describe("Filter by label"),
	// TODO: Again, enums? Also, since it can be used multiple times what schema type should it use?
	// z.array(z.string)?
	categories: z.string().describe("Filter by category"),
	// TODO: enums?
	sort_by: z.string().describe("Sort by a variable"),
	location: z
		.string()
		.describe("Location coordinate (longitude:x, latitude:y)"),
	// TODO: add refinement to require location when radius is given.
	radius: z.number().describe("How many meters from location"),
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
			"Sucessfully retrieved all reports",
		),
		[HttpStatusCodes.UNAUTHORIZED]: jsonContent(
			ErrorResponseSchema,
			"Unauthorized request",
		),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(
			ErrorResponseSchema,
			"Report not found",
		),
	},
});

export type GetAllReportsRoute = typeof getAllReportsRoute;
