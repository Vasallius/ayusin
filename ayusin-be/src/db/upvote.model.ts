import * as mongoose from "mongoose";

export const upvoteSchema = new mongoose.Schema(
	{
		version: { type: Number, required: true },
		userID: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		reportID: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Report",
		},
	},
	{ timestamps: true },
);

upvoteSchema.index({ userID: 1, reportID: 1 }, { unique: true });

export type Upvote = mongoose.InferSchemaType<typeof upvoteSchema>;
export const Upvote = mongoose.model("Upvote", upvoteSchema);
