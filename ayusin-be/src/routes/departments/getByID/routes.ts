import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import * as model from "./model";
import { ParamsIDSchema } from "./model";

const tags = ["department"];

export const getByID = createRoute({
	path: "/{id}",
	method: "get",
	tags,
	request: {
		params: ParamsIDSchema,
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			model.getDepartmentByIDResponse,
			"The retrieved department.",
		),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(
			model.getDepartmentByIDErrorResponse,
			"Error message when the department is not found.",
		),
		[HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
			model.getDepartmentByIDErrorResponse,
			"Error message when something wrong occured in the server.",
		),
	},
});

export type GetByIDRoute = typeof getByID;
