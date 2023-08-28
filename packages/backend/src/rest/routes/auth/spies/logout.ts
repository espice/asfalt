import { accessCookieConfig } from "../../../../utils/auth";
import { createRoute } from "../../../fileRouter";

export const POST = createRoute({
  handler: (req, reply) => {
    reply.clearCookie("dc.token", accessCookieConfig).send({ success: true });
  },
});
