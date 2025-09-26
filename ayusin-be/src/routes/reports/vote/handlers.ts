import * as HttpStatusCodes from "stoker/http-status-codes";
import { Report, Vote } from "@/db";
import type { AppRouteHandler } from "@/lib/types";
import type { UpdateReportVotesRoute } from "./routes";
import mongoose from "mongoose";
import { isNullOrUndefined } from "@/lib/utils";

export const updateReportVotesHandler: AppRouteHandler<
	UpdateReportVotesRoute
> = async (c) => {
	const { id: reportID } = c.req.valid("param");

	// TODO: Get User ID from JWT;
	const userID = "68d52bd0c49da3f4be2c0734";

	const { logger } = c.var;

	const { type, action } = c.req.valid("query");

	let upvotes: number | undefined, downvotes: number | undefined;

	await mongoose.connection.transaction(async function (session) {
		const report = await Report.findById(reportID).session(session).exec();

		if (report === null) {
			c.status(HttpStatusCodes.NOT_FOUND);
			throw new Error("Report not found given reportID");
		}

		let delta = 1;
		const increment: { upvotes?: number; downvotes?: number } = {};

		switch (action) {
			case "add": {
				const vote = new Vote({
					version: 1,
					userID,
					reportID: report._id,
					kind: type,
				});
				delta = 1;
				await vote.save({ session });
				break;
			}
			case "sub": {
				const vote = await Vote.findOneAndDelete(
					{ userID, reportID },
					{ session },
				);
				if (vote === null) {
					c.status(HttpStatusCodes.NOT_FOUND);
					throw new Error("Vote not found given userID and reportID");
				}
				delta = -1;
				break;
			}
			default:
				c.status(HttpStatusCodes.UNPROCESSABLE_ENTITY);
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
				c.status(HttpStatusCodes.UNPROCESSABLE_ENTITY);
				throw new Error("Unsupported vote type");
		}

		// Unfortunately, updateOne does not return the updated document.
		const updated = await Report.findOneAndUpdate(
			{ _id: report._id },
			{ $inc: increment },
			{ new: true, session },
		);

		upvotes = updated?.upvotes;
		downvotes = updated?.downvotes;
	});

	if (isNullOrUndefined(upvotes) || isNullOrUndefined(downvotes))
		throw new Error(
			"This should have been set within the transaction. Otherwise, transaction should have warranted an error",
		);

	return c.json(
		{
			status: "success",
			upvotes: upvotes,
			downvotes: downvotes,
		},
		HttpStatusCodes.OK,
	);
};
