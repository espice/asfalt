import { builder } from "../builder";
import { prisma } from "../../client/prisma";

const MissionAgent = builder.prismaObject("User", {
  variant: "MissionAgent",
  fields: (t) => ({
    id: t.field({
      type: "ID",
      authScopes: (root, _args, ctx) => {
        if (root.id == ctx.userId) {
          return { loggedIn: true };
        } else {
          return { isAdmin: true };
        }
      },
      resolve: (root) => {
        return root.id;
      },
    }),
    username: t.exposeString("username"),
    isAdmin: t.exposeBoolean("isAdmin"),
    sessions: t.relation("sessions"),
  }),
});

builder.prismaObject("Mission", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    agents: t.withAuth({ isAdmin: true }).prismaField({
      type: [MissionAgent],
      resolve: async (query, root, _args, ctx) => {
        return await prisma.user.findMany({
          where: {
            missions: {
              some: {
                missionId: root.id,
              },
            },
          },
          ...query,
        });
      },
    }),
    agentCount: t.relationCount("users"),
    deviceCount: t.field({
      type: "Int",
      resolve: () => 12,
    }),
    suspectCount: t.field({
      type: "Int",
      resolve: () => 4,
    }),
  }),
});

builder.queryFields((t) => ({
  missions: t.withAuth({ loggedIn: true }).prismaField({
    type: ["Mission"],
    resolve: async (query, _root, _args, ctx) => {
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: ctx.userId },
      });

      if (user?.isAdmin) {
        return await prisma.mission.findMany({ ...query });
      }

      return await prisma.mission.findMany({
        where: {
          users: {
            some: {
              userId: user.id,
            },
          },
        },
        ...query,
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createMission: t.withAuth({ isAdmin: true }).prismaField({
    type: "Mission",
    args: {
      title: t.arg.string({ required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      return await prisma.mission.create({
        data: {
          title: args.title,
          users: {
            create: [{ userId: ctx.userId }],
          },
        },
      });
    },
  }),
  addAgentToMission: t.withAuth({ isAdmin: true }).field({
    type: "Boolean",
    args: {
      agentId: t.arg.string({ required: true }),
      missionId: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      await prisma.mission.update({
        where: {
          id: args.missionId,
        },
        data: {
          users: {
            create: { userId: args.agentId },
          },
        },
      });

      return true;
    },
  }),
}));