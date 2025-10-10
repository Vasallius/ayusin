import { createClerkRouter } from "@/lib/create-app";
import { create, createMember } from "./create/index";

const routes = createClerkRouter()
	.basePath("/members")
	.openapi(create, createMember);

export default routes;
