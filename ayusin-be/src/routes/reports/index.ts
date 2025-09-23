import { createClerkRouter, createRouter } from "@/lib/create-app";
import { createReportRoute } from "./create/routes";
import { createReportHandler } from "./create/handlers";

const router = createRouter()
	.basePath("/reports")
	.openapi(createReportRoute, createReportHandler);

export default router;
