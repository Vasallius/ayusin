import { createClerkRouter } from "@/lib/create-app";
import { create,createDepartment } from "./create/index";

const routes = createClerkRouter()
    .basePath("/departments")
    .openapi(create, createDepartment);

export default routes
