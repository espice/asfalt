import { prisma } from "../client/prisma";
import { GraphQLContext } from "./context";

export const isAdmin = async (ctx: GraphQLContext): Promise<boolean> => {
  if (!ctx.userId) return false;

  const user = await prisma.user.findUnique({ where: { id: ctx.userId } });
  if (!user) return false;

  return user.isAdmin;
};

export interface MissionAccessArgs {
  missionId: string;
}

export const hasMissionAccess = async (
  ctx: GraphQLContext,
  args: MissionAccessArgs
): Promise<boolean> => {
  if (!ctx.userId) return false;

  const user = await prisma.user.findUnique({ where: { id: ctx.userId } });
  if (!user) return false;

  if (user.isAdmin) return true;

  const mission = await prisma.mission.findUnique({
    where: {
      id: args.missionId,
      users: {
        some: {
          userId: ctx.userId,
        },
      },
    },
  });

  if (!mission) return false;

  return true;
};
