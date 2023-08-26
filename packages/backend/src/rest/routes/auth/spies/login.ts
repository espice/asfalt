import { createRoute } from "../../../fileRouter";
import z from "zod";
import bcrypt from "bcrypt";
import { prisma } from "../../../../client/prisma";
import {
  accessCookieConfig,
  getDevice,
  tokenSigner,
} from "../../../../utils/auth";

export const POST = createRoute({
  schema: {
    body: z.object({
      id: z.string(),
      password: z.string(),
    }),
  },
  handler: async (req, reply) => {
    const { id, password } = req.body;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return reply.send({ success: false });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return reply.send({ success: false });

    console.log(validPassword);

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        ip: (req.headers["X-Forwarded-For"] ?? req.ip).toString(),
        device: getDevice(req.headers["user-agent"] ?? ""),
      },
    });

    const accessToken = await tokenSigner({ sessionId: session.id });
    reply
      .setCookie("dc.token", accessToken, accessCookieConfig)
      .send({ success: true });
  },
});
