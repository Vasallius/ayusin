import { createClerkRouter, createRouter } from "@/lib/create-app";
import { createReportCommentHandler, createReportCommentRoute } from "./create";

const commentRouter = createRouter()
	.basePath("/comments")
	.openapi(createReportCommentRoute, createReportCommentHandler);

export default commentRouter;
