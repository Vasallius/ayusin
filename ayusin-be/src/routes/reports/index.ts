import { createClerkRouter, createRouter } from "@/lib/create-app";
import { createReportRoute } from "./create/routes";
import { createReportHandler } from "./create/handlers";
import { getAllReportsRoute } from "./getAll/routes";
import { getAllReportsHandler } from "./getAll/handlers";
import { getReportRoute } from "./get/routes";
import { getReportHandler } from "./get/handlers";
import { updateReportRoute } from "./update/routes";
import { updateReportHandler } from "./update/handlers";

const router = createRouter()
	.basePath("/reports")
	.openapi(createReportRoute, createReportHandler)
	.openapi(getAllReportsRoute, getAllReportsHandler)
	.openapi(getReportRoute, getReportHandler)
	.openapi(updateReportRoute, updateReportHandler);

export default router;
