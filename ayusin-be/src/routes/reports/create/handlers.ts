import { AppRouteHandler } from "@/lib/types";
import { CreateRoute } from "./routes";
import * as HttpStatusCodes from "stoker/http-status-codes";

export const create: AppRouteHandler<CreateRoute> = async (c) => {
    console.log(c.var.jwtPayload);
    return c.json({
        message: "kek"
    }, HttpStatusCodes.OK);
}
