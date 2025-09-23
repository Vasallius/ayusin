import type { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import type { CreateReportRoute } from "./routes";

export const createReportHandler: AppRouteHandler<CreateReportRoute> = async (
	c,
) => {
	console.log(c.var.jwtPayload);
	return c.json(
		{
			status: "error",
			description: "Unauthorized. Missing 'Authorization' Header.",
		},
		HttpStatusCodes.UNPROCESSABLE_ENTITY,
	);
};
