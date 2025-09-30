import * as HttpStatusCodes from "stoker/http-status-codes";
import { Role } from "@/db";
import type { AppRouteHandler } from "@/lib/types";
import { roleDocToZod } from "./model";
import type { GetByIDRoute } from "./routes";

export const getRoleByID: AppRouteHandler<GetByIDRoute> = async (c) => {
	const { id } = c.req.valid("param");
	try {
		const role = await Role.findById(id).exec();

		if (role == null) {
			return c.json(
				{
					status: "error",
					description: "The role is not found in the database.",
				},
				HttpStatusCodes.NOT_FOUND,
			);
		}

		return c.json(
			{
				status: "success",
				...roleDocToZod(role),
			},
			HttpStatusCodes.OK,
		);
	} catch (error) {
		c.var.logger.error(error);
		return c.json(
			{
				status: "error",
				description: "Something wrong occured while processing your request.",
			},
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
		);
	}
};
