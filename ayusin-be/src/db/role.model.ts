import * as mongoose from "mongoose";

export const roleSchema = new mongoose.Schema(
	{
		version: { type: Number, required: true },
		name: { type: String, required: true },
		description: { type: String, required: false },
    importance: { type: Number, required: true },
		parentRole: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: "Role",
		},
		clearanceLevel: { type: String, required: true },
		accessScope: { type: [String], required: true },
	},
	{ timestamps: true },
);

export type Role = mongoose.InferSchemaType<typeof roleSchema>;
export const Role = mongoose.model("Role", roleSchema);
