
import { createClerkRouter } from "@/lib/create-app";
import { create, createMember } from "./create/index";
import { getByUserID, getMemberByUserID } from "./getByUserID/index";

const routes = createClerkRouter()
    .basePath("/members")
    .openapi(create, createMember)
    .openapi(getByUserID, getMemberByUserID);

export default routes;
