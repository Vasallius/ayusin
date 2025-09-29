import * as mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
	{
		version: { type: Number, required: true },
		role: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Role",
		},
		department: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Department",
		},
		name: { type: String, required: true },
		email: { type: String, required: false },
		phone: { type: String, required: false },
		avatar: { type: String, required: false },
		userID: { type: String, required: true }, // for clerk this is the clerk ID, otherwise it's the user ID from webauthn

		// specific to citizens only
		credentialID: { type: String, required: true },
		publicKey: { type: String, required: true },
		counter: { type: Number, required: true },
	},
	{ timestamps: true },
);

export type User = mongoose.InferSchemaType<typeof userSchema>;
export const User = mongoose.model("User", userSchema);
