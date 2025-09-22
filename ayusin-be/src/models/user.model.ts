import * as mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
	{
		version: { type: String, required: true },
		type: { type: String, enum: ["Citizen", "LGU"], required: true },
		clerkID: { type: String, required: true },
	},
	{ timestamps: true },
);

export type User = mongoose.InferSchemaType<typeof userSchema>;
export const User = mongoose.model("User", userSchema);
