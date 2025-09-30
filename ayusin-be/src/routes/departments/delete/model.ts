import { z } from "zod";

export const ParamsIDSchema = z.object({
	id: z
		.string()
		.min(3)
		.openapi({
			param: {
				name: "id",
				in: "path",
			},
			example: "3298",
		}),
});

export const deleteDepartmentByIDResponse = z.object({
	status: z.literal("success"),
});

export const deleteDepartmentByIDErrorResponse = z.object({
	status: z.literal("error"),
	description: z.string(),
});
