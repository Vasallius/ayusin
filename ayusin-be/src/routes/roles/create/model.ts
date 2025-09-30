import { z } from "zod";

export const RoleSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional(),
	importance: z.number(),
	parent_role: z.string().optional(),
	clearance_level: z.string(),
	access_scope: z.array(z.string()),
});

export const createRoleRequest = RoleSchema.omit({
	id: true,
});

export const createRoleOkResponse = z.object({
	status: z.literal("success"),
	...RoleSchema.shape,
});

export const createRoleErrorResponse = z.object({
	status: z.literal("error"),
	description: z.string(),
});
