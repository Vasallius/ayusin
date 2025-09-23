import { createClerkRouter, createRouter } from "@/lib/create-app";
import * as handlers from "./create/handlers";
import * as routes from "./create/routes";

const router = createRouter().openapi(routes.create, handlers.create);

export default router;
