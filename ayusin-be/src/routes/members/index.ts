import { createClerkRouter } from "@/lib/create-app";
import { create, createMember } from "./create/index";
import { getByUserID, getMemberByUserID } from "./getByUserID/index";
import { deleteByUserID, deleteMemberByUserID } from "./deleteByUserID/index";

const routes = createClerkRouter()
	.basePath("/members")
	.openapi(create, createMember)
	.openapi(getByUserID, getMemberByUserID)
	.openapi(deleteByUserID, deleteMemberByUserID);

export default routes;
