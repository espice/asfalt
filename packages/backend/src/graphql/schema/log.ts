import { LogType } from "@cw23/database";
import { prisma } from "../../client/prisma";
import { builder } from "../builder";

builder.prismaObject("Log", {
  fields: (t) => ({
    id: t.exposeID("id"),
    type: t.exposeString("type"),
    message: t.exposeString("message"),
    time: t.exposeString("time"),
    flagged: t.exposeBoolean("flagged"),
    device: t.relation("device"),
  }),
});

builder.mutationFields((t) => ({
  addLog: t.withAuth({ isAdmin: true }).field({
    type: "Boolean",
    args: {
      deviceId: t.arg.string({ required: true }),
      time: t.arg.string({ required: true }),
      message: t.arg.string({ required: true }),
      type: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, _ctx) => {
      await prisma.log.create({
        data: { ...args, type: args.type as LogType },
      });
      return true;
    },
  }),
  flagLog: t.field({
    type: "Boolean",
    args: {
      logId: t.arg.string({ required: true }),
      missionId: t.arg.string({ required: true }),
    },
    authScopes(parent, args, context, info) {
      return {
        missionAccess: {
          missionId: args.missionId,
        },
      };
    },
    resolve: async (_root, args, _ctx) => {
      await prisma.log.update({
        where: {
          id: args.logId,
        },
        data: {
          flagged: true,
        },
      });
      return false;
    },
  }),
  unflagLog: t.field({
    type: "Boolean",
    args: {
      logId: t.arg.string({ required: true }),
      missionId: t.arg.string({ required: true }),
    },
    authScopes(parent, args, context, info) {
      return {
        missionAccess: {
          missionId: args.missionId,
        },
      };
    },
    resolve: async (_root, args, _ctx) => {
      await prisma.log.update({
        where: {
          id: args.logId,
        },
        data: {
          flagged: false,
        },
      });
      return false;
    },
  }),
}));

builder.queryFields((t) => ({
  flaggedLogs: t.prismaField({
    type: ["Log"],
    args: {
      missionId: t.arg.string({ required: true }),
    },
    authScopes(parent, args, context, info) {
      return {
        missionAccess: {
          missionId: args.missionId,
        },
      };
    },
    resolve: async (query, _root, args, ctx) => {
      return await prisma.log.findMany({
        where: {
          device: {
            missionId: args.missionId,
          },
        },
        ...query,
      });
    },
  }),
}));
