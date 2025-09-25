import * as HttpStatusCodes from "stoker/http-status-codes";
import { Report, Comment } from "@/db";
import type { AppRouteHandler } from "@/lib/types";
import { CreateReportCommentRoute } from "./routes";

export const createReportCommentHandler: AppRouteHandler<
	CreateReportCommentRoute
> = async (c) => {
	const { id: reportID } = c.req.valid("param");

	// TODO: Get User ID from JWT;
	const userID = "68d52bd0c49da3f4be2c0734";

	const { text } = c.req.valid("json");

	try {
		const report = await Report.findById(reportID).exec();

		// Sanity check, not commenting on a non-existent report
		if (report === null) {
			return c.json(
				{
					status: "error",
					description: "Report not found",
				},
				HttpStatusCodes.NOT_FOUND,
			);
		}

		const comment = new Comment({
			version: 1,
			text,
			userID,
			reportID,
		});

		// Await, in case saving fails
		await comment.save();

		// TODO: Helper to transform Zod ReportSchema to Mongoose ReportSchema
		return c.json(
			{
				status: "success",
				id: comment._id.toString(),
				text,
			},
			HttpStatusCodes.OK,
		);
	} catch (error) {
		// TODO: log caught error more properly
		console.log(error);
		return c.json(
			{
				status: "error",
				description: "Updating a report failed.",
			},
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
		);
	}
};
