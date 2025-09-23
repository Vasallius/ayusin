import * as mongoose from "mongoose";
import { pointSchema } from "./point.model";

export const reportSchema = new mongoose.Schema(
	{
		version: { type: String, required: true },
		title: { type: String, required: true },
		description: { type: String, required: false },
		labels: { type: [String], required: false },
		location: {
			type: pointSchema,
			required: true,
		},
		history: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "ReportHistory",
			},
		],
		upvotes: { type: Number, required: true, default: 0 },
		metadata: {
			mediaLinks: { type: [String], required: true },
			scope: {
				type: String,
				enum: ["Barangay", "City", "Province", "Regional", "National"],
				required: true,
			},
			categories: { type: [String], required: true },
			dateClosed: { type: mongoose.Schema.Types.Date, required: false },
			assignedDepartmentIDs: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Department",
				},
			],
			assignedPersonnelIDs: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
			],
		},
	},
	{ timestamps: true },
);

export type Report = mongoose.InferSchemaType<typeof reportSchema>;
export const Report = mongoose.model("Report", reportSchema);
