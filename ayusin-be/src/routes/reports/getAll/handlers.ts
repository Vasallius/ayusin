import * as HttpStatusCodes from "stoker/http-status-codes";
import { Report } from "@/db";
import type { AppRouteHandler } from "@/lib/types";
import { reportDocToZod } from "../schema";
import type { GetAllReportsRoute } from "./routes";

export const getAllReportsHandler: AppRouteHandler<GetAllReportsRoute> = async (
	c,
) => {
	const queryParams = c.req.valid("query");

	let query = Report.find({});

	if (queryParams.sort_by !== undefined) {
		query = query.sort({
			[queryParams.sort_by]: queryParams.order_by ?? "asc",
		});
	}

	if (queryParams.limit !== undefined) {
		query = query.limit(Number(queryParams.limit));
	}

	if (queryParams.department !== undefined) {
		query = query.find({
			"metadata.assignedDepartmentIDs": queryParams.department,
		});
	}

	if (queryParams.label !== undefined) {
		query = query.find({
			labels: queryParams.label,
		});
	}

	if (queryParams.categories !== undefined) {
		query = query.find({
			"metadata.category": queryParams.categories,
		});
	}

	if (queryParams.location !== undefined && queryParams.radius !== undefined) {
		query = query.find({
			location: {
				$nearSphere: {
					$geometry: {
						type: "Point",
						coordinates: [queryParams.location.x, queryParams.location.y],
					},
					$maxDistance: queryParams.radius,
				},
			},
		});
	}

	try {
		const reports = await query.exec();

		return c.json(
			{
				status: "success",
				reports: reports.map(reportDocToZod),
			},
			HttpStatusCodes.OK,
		);
	} catch (error) {
		c.var.logger.error(error);
		return c.json(
			{
				status: "error",
				description: "Fetching reports failed.",
			},
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
		);
	}
};
