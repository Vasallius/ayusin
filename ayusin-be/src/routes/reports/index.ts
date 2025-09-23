import { createClerkRouter, createRouter } from "@/lib/create-app";
import { createReportRoute } from "./create/routes";
import { createReportHandler } from "./create/handlers";
import { getAllReportsRoute } from "./getAll/routes";
import { getAllReportsHandler } from "./getAll/handlers";

const router = createRouter()
	.basePath("/reports")
	.openapi(createReportRoute, createReportHandler)
	.openapi(getAllReportsRoute, getAllReportsHandler);

export default router;
