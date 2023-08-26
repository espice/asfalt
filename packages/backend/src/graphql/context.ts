import { FastifyRequest } from "fastify";
import { prisma } from "../client/prisma";
import { tokenVerifier } from "../utils/auth";

export interface GraphQLContext {
  req: FastifyRequest;
  userId?: string;
}

export const getContext = async ({
  req,
}: {
  req: FastifyRequest;
}): Promise<GraphQLContext> => {
  const accessToken = req.cookies["dc.token"];
  
  if (accessToken) {
    try {
      const { sessionId }: { sessionId: string } =
        await tokenVerifier(accessToken);

      const session = await prisma.session.findUnique({
        where: { id: sessionId },
      });
      return { req, userId: session?.userId };
    } catch (error) {
      req.log.error(error);
      return { req };
    }
  }
  return { req };
};
