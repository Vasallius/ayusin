import * as HttpStatusCodes from "stoker/http-status-codes";
import { Report } from "@/db";
import type { AppRouteHandler } from "@/lib/types";
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
			{
				status: "success",
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
			},
			HttpStatusCodes.OK,
		);
	} catch (error) {
		// TODO: log caught error more properly
		console.log(error);
		return c.json(
			{
				status: "error",
				description: "Fetching a report failed.",
			},
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
		);
	}
};
