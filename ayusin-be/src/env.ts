import { z } from "zod";

const EnvSchema = z.object({
	PORT: z.string().default("3000").describe("Port"),
	LOG_LEVEL: z.string().optional().default("info").describe("Log Level"),
	CLERK_JWT_PUBLIC_KEY: z.string().describe("Clerk JWT Public Key"),
	// DATABASE_CONNECTION_STRING: z
	// 	.string()
	// 	.describe("MongoDB Connection String"),
});

export type Env = z.infer<typeof EnvSchema>;

const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
	console.error("Invalid environment variables: ", error);
	console.error(z.flattenError(error));
	process.exit(1);
}

export default env;
