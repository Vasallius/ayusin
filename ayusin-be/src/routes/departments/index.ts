import { createClerkRouter } from "@/lib/create-app";
import { create,createDepartment } from "./create/index";
import { getByID, getDepartmentByID } from "./getByID/index";

const routes = createClerkRouter()
    .basePath("/departments")
    .openapi(create, createDepartment)
    .openapi(getByID, getDepartmentByID);

export default routes
