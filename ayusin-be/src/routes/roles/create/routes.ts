import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import * as model from "./model";

const tags = ["role"];

export const create = createRoute({
	path: "/",
	method: "post",
	tags,
	request: {
		body: jsonContentRequired(model.createRoleRequest, "The role to create"),
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			model.createRoleOkResponse,
			"The created role.",
		),
		[HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
			model.createRoleErrorResponse,
			"Error message when something wrong occured in the server.",
		),
	},
});

export type CreateRoute = typeof create;
