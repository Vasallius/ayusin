import * as mongoose from "mongoose";

export const voteSchema = new mongoose.Schema(
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
		kind: {
			type: String,
			enum: ["upvote", "downvote"] as const,
			required: true,
		},
	},
	{ timestamps: true },
);

voteSchema.index({ userID: 1, reportID: 1, kind: 1 }, { unique: true });

export type Vote = mongoose.InferSchemaType<typeof voteSchema>;
export const Vote = mongoose.model("Vote", voteSchema);
