import { z } from "zod";

const baseErrorResponse = z.object({
	status: z.literal("error").readonly().optional(),
	message: z.string(),
	errorCode: z.string(),
});

export type ErrorResponse = z.infer<typeof baseErrorResponse>;

const testError: ErrorResponse = {
	message: "test",
	errorCode: "test",
};

export class AyusinAPIException extends Error {
	public statusCode: number = HTTPStatusCode.INTERNAL_SERVER_ERROR;

	constructor(message: string) {
		super(message);
		this.name = "AyusinAPIException";

		Object.setPrototypeOf(this, AyusinAPIException.prototype);
	}

	public toJSON() {
		return {
			message: this.message,
		} as ErrorResponse;
	}
}
