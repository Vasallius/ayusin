import { createClerkRouter, createRouter } from "@/lib/create-app";
import { createReportHandler, createReportRoute } from "./create";
import { getReportHandler, getReportRoute } from "./get";
import { getAllReportsHandler, getAllReportsRoute } from "./getAll";
import { updateReportHandler, updateReportRoute } from "./update";
import { updateReportVotesHandler, updateReportVotesRoute } from "./vote";
import {
	createReportCommentHandler,
	createReportCommentRoute,
} from "./create-comment";

const router = createRouter()
	.basePath("/reports")
	.openapi(createReportRoute, createReportHandler)
	.openapi(getAllReportsRoute, getAllReportsHandler)
	.openapi(getReportRoute, getReportHandler)
	.openapi(updateReportRoute, updateReportHandler)
	.openapi(updateReportVotesRoute, updateReportVotesHandler)
	.openapi(createReportCommentRoute, createReportCommentHandler);

export default router;
