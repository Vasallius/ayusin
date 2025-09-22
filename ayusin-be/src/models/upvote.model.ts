import * as mongoose from "mongoose";

export const upvoteSchema = new mongoose.Schema(
	{
		version: { type: String, required: true },
		userID: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		reportID: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
	},
	{ timestamps: true },
);

export type Upvote = mongoose.InferSchemaType<typeof upvoteSchema>;
export const Upvote = mongoose.model("Upvote", upvoteSchema);
