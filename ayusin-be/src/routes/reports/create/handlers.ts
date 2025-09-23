import type { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import type { CreateRoute } from "./routes";

export const create: AppRouteHandler<CreateRoute> = async (c) => {
	console.log(c.var.jwtPayload);
	return c.json(
		{
			status: "error",
			description: "Unauthorized. Missing 'Authorization' Header.",
		},
		HttpStatusCodes.UNPROCESSABLE_ENTITY,
	);
};
