import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { z } from "zod";

// TODO: Use proper float32/64 depending on db
const Location = z.object({
  x: z.number(),
  y: z.number(),
});

const SuccessResponseSchema = z.object({
  status: z.literal("success"),
  id: z.string(),
  title: z.string(),
  description: z.string(),
  // TODO: Ideally this is an enum.
  category: z.string(),
  labels: z.array(z.string()),
  media_links: z.array(z.string()),
  // TODO: Handle defaults db-wise
  upvotes: z.number().min(0),
  location: Location,
});

export const create = createRoute({
  description: "Create a new report",
  path: "/reports",
  method: "post",
  tags: ["Reports"],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      SuccessResponseSchema,
      "Successfully created a new report",
    ),
  },
});

export type CreateRoute = typeof create;
