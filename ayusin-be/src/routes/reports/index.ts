import { createClerkRouter, createRouter } from "@/lib/create-app";
import { createReportHandler } from "./create/handlers";
import { createReportRoute } from "./create/routes";
import { getReportHandler } from "./get/handlers";
import { getReportRoute } from "./get/routes";
import { getAllReportsHandler } from "./getAll/handlers";
import { getAllReportsRoute } from "./getAll/routes";
import { updateReportHandler } from "./update/handlers";
import { updateReportRoute } from "./update/routes";

const router = createRouter()
	.basePath("/reports")
	.openapi(createReportRoute, createReportHandler)
	.openapi(getAllReportsRoute, getAllReportsHandler)
	.openapi(getReportRoute, getReportHandler)
	.openapi(updateReportRoute, updateReportHandler);

export default router;
