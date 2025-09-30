import { createClerkRouter } from "@/lib/create-app";
import { create, createRole } from "./create/index";
import { getByID, getRoleByID } from "./getByID/index";
import { updateByID, updateRoleByID } from "./updateByID/index";
import { deleteByID, deleteRoleByID } from "./delete/index";

const routes = createClerkRouter()
	.basePath("/roles")
	.openapi(create, createRole)
	.openapi(getByID, getRoleByID)
	.openapi(updateByID, updateRoleByID)
	.openapi(deleteByID, deleteRoleByID);

export default routes;
