import * as mongoose from "mongoose";

export const commentSchema = new mongoose.Schema(
	{
		version: { type: String, required: true },
		text: { type: String, required: true },
		upvotes: { type: Number, required: true, default: 0 },
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

export type Comment = mongoose.InferSchemaType<typeof commentSchema>;
export const Comment = mongoose.model("Comment", commentSchema);
