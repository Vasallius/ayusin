import * as HttpStatusCodes from "stoker/http-status-codes";
import { Report } from "@/db";
import type { AppRouteHandler } from "@/lib/types";
import type { UpdateReportVotesRoute } from "./routes";

export const updateReportVotesHandler: AppRouteHandler<
	UpdateReportVotesRoute
> = async (c) => {
	const { id } = c.req.valid("param");

	const { type, action } = c.req.valid("query");

	try {
		let delta = 0;
		const increment: { upvotes?: number; downvotes?: number } = {};

		switch (action) {
			case "add":
				delta = 1;
				break;
			case "sub":
				delta = -1;
				break;

			// On unsupported action, hit try catch to respond with 500
			default:
				throw new Error("Unsupported action");
		}

		switch (type) {
			case "upvote":
				increment.upvotes = delta;
				break;
			case "downvote":
				increment.downvotes = delta;
				break;

			default:
				// On unsupported action, hit try catch to respond with 500
				throw new Error("Unsupported type");
		}

		// TODO: Should we do checking s.t. upvotes and downvotes cannot decrement below zero?
		const report = await Report.findOneAndUpdate(
			{ _id: id },
			{ $inc: increment },
			{ new: true },
		).exec();

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
				upvotes: report.upvotes,
				downvotes: report.downvotes,
			},
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
