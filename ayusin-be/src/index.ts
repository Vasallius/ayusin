import { serve } from "bun";

import app from "./app";
import env from "./env";

const port = env?.PORT;

console.log(`🚀 Server starting on PORT ${port}...`);

serve({
	fetch: app.fetch,
	port,
});
