import * as HttpStatusCodes from "stoker/http-status-codes";
import type { AppRouteHandler } from "@/lib/types";
import { Report } from "../../../db";
import type { CreateReportRoute } from "./routes";

export const createReportHandler: AppRouteHandler<CreateReportRoute> = async (
	c,
) => {
	const body = c.req.valid("json");

	try {
		const report = new Report({
			version: 1,
			title: body.title,
			description: body.description,
			location: {
				type: "Point",
				coordinates: [body.location.x, body.location.y],
			},
			metadata: {
				scope: body.scope,
				category: body.category,
			},
		});

		report.save();

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
		c.var.logger.error(error);
		return c.json(
			{
				status: "error",
				description: "Creating a report failed.",
			},
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
		);
	}
};
