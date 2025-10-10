import * as HttpStatusCodes from "stoker/http-status-codes";
import { User } from "@/db/user.model";
import type { AppRouteHandler } from "@/lib/types";
import type { GetAllMembersRoute } from "./routes";
import { memberDocToZod } from "../../../members/getByUserID/model";

export const getAllMembersHandler: AppRouteHandler<GetAllMembersRoute> = async (
	c,
) => {
	const { department_id } = c.req.valid("param");
	try {
		const docs = await User.find({
			department: department_id,
			type: "lgu_member",
		}).exec();
		const members = docs.map(memberDocToZod);
		return c.json({ status: "success", members }, HttpStatusCodes.OK);
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
