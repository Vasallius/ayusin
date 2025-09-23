import type { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { GetAllReportsRoute } from "./routes";

export const getAllReportsHandler: AppRouteHandler<GetAllReportsRoute> = async (
	c,
) => {
	console.log(c.var.jwtPayload);
	return c.json(
		{
			status: "error",
			description: "Unauthorized. Missing 'Authorization' Header.",
		},
		HttpStatusCodes.UNAUTHORIZED,
	);
};
