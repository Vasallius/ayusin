import type { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { GetReportRoute } from "./routes";

export const getReportHandler: AppRouteHandler<GetReportRoute> = async (c) => {
	console.log(c.var.jwtPayload);
	return c.json(
		{
			status: "error",
			description: "Unauthorized. Missing 'Authorization' Header.",
		},
		HttpStatusCodes.UNAUTHORIZED,
	);
};
