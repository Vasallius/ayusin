import * as mongoose from "mongoose";

export const reportLogSchema = new mongoose.Schema(
	{
		version: { type: Number, required: true },
		title: { type: String, required: true },
		description: { type: String, required: false },
		action: {
			type: String,
			required: true,
		},
		userIDs: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
			],
			minlength: [1, "userIDs must contain at least one element"],
			required: true,
		},
		// this is optional
		metadata: new mongoose.Schema({
			commentID: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "Comment",
			},
		}),
	},
	{ timestamps: true },
);

export type ReportLog = mongoose.InferSchemaType<typeof reportLogSchema>;
export const ReportLog = mongoose.model("ReportLog", reportLogSchema);
