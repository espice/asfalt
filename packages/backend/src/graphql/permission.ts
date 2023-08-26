import { prisma } from "../client/prisma";
import { GraphQLContext } from "./context";

export const isAdmin = async (ctx: GraphQLContext): Promise<boolean> => {
  if (!ctx.userId) return false;

  const user = await prisma.user.findUnique({ where: { id: ctx.userId } });
  if (!user) return false;

  return user.isAdmin;
};
