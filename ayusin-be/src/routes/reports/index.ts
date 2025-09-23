import { createClerkRouter, createRouter } from "@/lib/create-app";
import { createReportHandler, createReportRoute } from "./create";
import { getReportHandler, getReportRoute } from "./get";
import { getAllReportsHandler, getAllReportsRoute } from "./getAll";
import { updateReportHandler, updateReportRoute } from "./update";

const router = createRouter()
	.basePath("/reports")
	.openapi(createReportRoute, createReportHandler)
	.openapi(getAllReportsRoute, getAllReportsHandler)
	.openapi(getReportRoute, getReportHandler)
	.openapi(updateReportRoute, updateReportHandler);

export default router;
