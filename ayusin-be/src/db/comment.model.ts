import * as mongoose from "mongoose";

export const commentSchema = new mongoose.Schema(
	{
		version: { type: Number, required: true },
		text: { type: String, required: true },
		upvotes: { type: Number, required: true, default: 0 },
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
		isInternal: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

export type Comment = mongoose.InferSchemaType<typeof commentSchema>;
export const Comment = mongoose.model("Comment", commentSchema);
