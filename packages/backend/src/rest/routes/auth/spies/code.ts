import { createRoute } from "../../../fileRouter";
import z from "zod";

export const POST = createRoute({
  schema: {
    body: z.object({
      code: z.string(),
    }),
  },
  handler: async (req, reply) => {
    const code = "rinkiya ke papa";

    if (code == req.body.code) {
      return reply.send({ granted: true });
    }

    reply.send({ granted: false });
  },
});
