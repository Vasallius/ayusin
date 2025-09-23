import type { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { UpdateReportRoute } from "./routes";

export const updateReportHandler: AppRouteHandler<UpdateReportRoute> = async (
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
