import * as HttpStatusCodes from "stoker/http-status-codes";
import { Report } from "@/db";
import type { AppRouteHandler } from "@/lib/types";
import { reportDocToZod } from "../schema";
import type { GetReportRoute } from "./routes";

export const getReportHandler: AppRouteHandler<GetReportRoute> = async (c) => {
	const { id } = c.req.valid("param");

	try {
		const report = await Report.findById(id).exec();

		if (report === null) {
			return c.json(
				{
					status: "error",
					description: "Report not found",
				},
				HttpStatusCodes.NOT_FOUND,
			);
		}

		return c.json(
			{ status: "success", ...reportDocToZod(report) },
			HttpStatusCodes.OK,
		);
	} catch (error) {
		c.var.logger.error(error);
		return c.json(
			{
				status: "error",
				description: "Fetching a report failed.",
			},
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
		);
	}
};
