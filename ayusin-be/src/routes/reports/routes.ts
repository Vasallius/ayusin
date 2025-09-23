import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { z } from "zod";

const tags = ["Reports"];

const what = z.object({
    "message": z.string()
});

export const create = createRoute({
    path: "/reports",
    method: "post",
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            what,
            "Message"
        )
    }
})

export type CreateRoute = typeof create;
