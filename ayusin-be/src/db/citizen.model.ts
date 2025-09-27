import * as mongoose from "mongoose";

export const citizenSchema = new mongoose.Schema(
	{
		version: { type: Number, required: true },
		userID: { type: String, required: true },
		credentialID: { type: String, required: true },
		publicKey: { type: String, required: true },
		counter: { type: Number, required: true },
	},
	{ timestamps: true },
);

export type Citizen = mongoose.InferSchemaType<typeof citizenSchema>;
export const Citizen = mongoose.model("Citizen", citizenSchema);
