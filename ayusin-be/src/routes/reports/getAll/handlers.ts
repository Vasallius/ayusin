import * as HttpStatusCodes from "stoker/http-status-codes";
import { Report } from "@/db";
import type { AppRouteHandler } from "@/lib/types";
import type { GetAllReportsRoute } from "./routes";

export const getAllReportsHandler: AppRouteHandler<GetAllReportsRoute> = async (
	c,
) => {
	const queryParams = c.req.valid("query");

	let query = Report.find({});

	if (queryParams.sort_by !== undefined) {
		query = query.sort({ [queryParams.sort_by]: queryParams.order_by });
	}

	if (queryParams.limit !== undefined) {
		query = query.limit(Number(queryParams.limit));
	}

	// TODO: find by department

	// TODO: find by label

	// TODO: find by categories

	// TODO: find by location/radius

	try {
		const reports = await query.exec();

		return c.json(
			{
				status: "success",
				reports: reports.map((report) => {
					return {
						id: report._id.toString(),
						created_at: report.createdAt,
						updated_at: report.updatedAt,
						title: report.title,
						description: report.description ?? undefined,
						category: report.metadata.category,
						scope: report.metadata.scope,
						labels: report.labels,
						media_links: report.metadata.mediaLinks,
						upvotes: report.upvotes,
						location: {
							x: report.location.coordinates[0],
							y: report.location.coordinates[1],
						},
					};
				}),
			},
			HttpStatusCodes.OK,
		);
	} catch (error) {
		// TODO: log caught error more properly
		console.log(error);
		return c.json(
			{
				status: "error",
				description: "Fetching reports failed.",
			},
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
		);
	}
};
