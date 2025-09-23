import * as mongoose from "mongoose";
import { pointSchema } from "./point.model";

export const departmentSchema = new mongoose.Schema(
	{
		version: { type: Number, required: true },
		name: { type: String, required: true },
		shortName: { type: String, required: false },
		contact: { type: String, required: false },
		email: { type: String, required: false },
		headquarterAddress: { type: String, required: false },
		headquarterLocation: { type: pointSchema, required: false },
		members: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true },
);

export type Department = mongoose.InferSchemaType<typeof departmentSchema>;
export const Department = mongoose.model("Department", departmentSchema);
