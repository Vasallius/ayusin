import * as HttpStatusCodes from "stoker/http-status-codes";
import { Report } from "@/db";
import type { AppRouteHandler } from "@/lib/types";
import { isNullOrUndefined } from "@/lib/utils";
import { reportDocToZod } from "../schema";
import type { UpdateReportRoute } from "./routes";

export const updateReportHandler: AppRouteHandler<UpdateReportRoute> = async (
	c,
) => {
	const { id } = c.req.valid("param");

	const patch = c.req.valid("json");

	try {
		// TODO: Investigate if findByIdAndUpdate would be better than the current approach
		// Pros: atomicity, single roundtrip to db. Cons: no pre/post save middlewares.
		const report = await Report.findById(id).exec();

		if (report === null) {
			return c.json(
				{
					status: "error",
					description: "Report not found",
				},
				HttpStatusCodes.UNPROCESSABLE_ENTITY,
			);
		}

		if (!isNullOrUndefined(patch.title)) {
			report.set("title", patch.title);
		}

		if (!isNullOrUndefined(patch.description)) {
			report.set("description", patch.description);
		}

		// Overwrites Labels array, does not append
		if (!isNullOrUndefined(patch.labels)) {
			report.set("labels", patch.labels);
		}

		if (!isNullOrUndefined(patch.location)) {
			report.set("location.coordinates", [patch.location.x, patch.location.y]);
		}

		if (!isNullOrUndefined(patch.scope)) {
			report.set("metadata.scope", patch.scope);
		}

		if (!isNullOrUndefined(patch.category)) {
			report.set("metadata.category", patch.category);
		}

		await report.save();

		return c.json(
			{ status: "success", ...reportDocToZod(report) },
			HttpStatusCodes.OK,
		);
	} catch (error) {
		c.var.logger.error(error);
		return c.json(
			{
				status: "error",
				description: "Updating a report failed.",
			},
			HttpStatusCodes.INTERNAL_SERVER_ERROR,
		);
	}
};
