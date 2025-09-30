import * as HttpStatusCodes from "stoker/http-status-codes";
import { Department } from "@/db/department.model";
import type { AppRouteHandler } from "@/lib/types";
import type { DeleteByIDRoute } from "./routes";

export const deleteDepartmentByID: AppRouteHandler<DeleteByIDRoute> = async (
	c,
) => {
	const { id } = c.req.valid("param");
	try {
		const department = await Department.findById(id).exec();

		if (department == null) {
			return c.json(
				{
					status: "error",
					description: "The department is not found in the database.",
				},
				HttpStatusCodes.NOT_FOUND,
			);
		}

		department.deleteOne().exec();

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
