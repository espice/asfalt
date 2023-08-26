import { createRoute } from "../../../fileRouter";

export const POST = createRoute({
  handler: (req, reply) => {
    reply.clearCookie("dc.token").send({ success: true });
  },
});
