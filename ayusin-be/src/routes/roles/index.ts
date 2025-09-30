import { createClerkRouter } from "@/lib/create-app";
import { create, createRole } from "./create/index";
import { getByID, getRoleByID } from "./getByID/index";

const routes = createClerkRouter()
	.basePath("/roles")
	.openapi(create, createRole)
	.openapi(getByID, getRoleByID);

export default routes;
