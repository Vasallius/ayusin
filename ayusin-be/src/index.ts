import { serve } from "bun";

import app from "./app";
import env from "./env";
import { connectDB } from "./config/db";

const port = env.PORT;

connectDB(env.MONGODB_URI);

console.log(`🚀 Server starting on PORT ${port}...`);

serve({
	fetch: app.fetch,
	port,
});
