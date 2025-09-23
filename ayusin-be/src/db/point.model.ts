import * as mongoose from "mongoose";

export const pointSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ["Point"],
		required: true,
	},
	coordinates: {
		type: [Number],
		required: true,
	},
});

export type Point = mongoose.InferSchemaType<typeof pointSchema>;
export const Point = mongoose.model("Point", pointSchema);
