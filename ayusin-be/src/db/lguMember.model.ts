import * as mongoose from "mongoose";

export const lguMemberSchema = new mongoose.Schema(
	{
		version: { type: Number, required: true },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department"
        },
		name: { type: String, required: true },
		email: { type: String, required: false },
		phone: { type: String, required: false },
		avatar: { type: String, required: false },
		clerkID: { type: String, required: true },
	},
	{ timestamps: true },
);

export type LguMember = mongoose.InferSchemaType<typeof lguMemberSchema>;
export const LguMember = mongoose.model("LguMember", lguMemberSchema);
