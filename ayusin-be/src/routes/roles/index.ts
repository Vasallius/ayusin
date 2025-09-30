import { createClerkRouter } from "@/lib/create-app";
import { create, createRole } from "./create/index";

const routes = createClerkRouter()
	.basePath("/roles")
	.openapi(create, createRole);

export default routes;
