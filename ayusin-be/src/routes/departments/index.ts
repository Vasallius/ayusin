import { createClerkRouter } from "@/lib/create-app";
import * as handlers from "./handlers";
import * as routes from "./routes";

const router = createClerkRouter()
    .openapi(routes.create, handlers.createDepartment);

export default router;
