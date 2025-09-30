import * as HttpStatusCodes from "stoker/http-status-codes";
import { Role } from "@/db";
import type { AppRouteHandler } from "@/lib/types";
import type { DeleteByIDRoute } from "./routes";

export const deleteRoleByID: AppRouteHandler<DeleteByIDRoute> = async (c) => {
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

		role.deleteOne().exec();

		return c.json({ status: "success" }, HttpStatusCodes.OK);
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
