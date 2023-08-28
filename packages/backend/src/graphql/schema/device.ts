import { prisma } from "../../client/prisma";
import { builder } from "../builder";

const DeviceMission = builder.prismaObject("Mission", {
  variant: "DeviceMission",
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
  }),
});

builder.prismaObject("Device", {
  fields: (t) => ({
    id: t.exposeID("id"),
    owner: t.exposeString("owner"),
    location: t.exposeString("location"),
    lastAccessed: t.exposeString("lastAccessed"),
    suspected: t.exposeBoolean("suspected"),
    mission: t.relation("mission", { type: DeviceMission, nullable: true }),
  }),
});

builder.queryFields((t) => ({
  devices: t.withAuth({ isAdmin: true }).prismaField({
    type: ["Device"],
    resolve: async (query, _root, _args, _ctx) => {
      return await prisma.device.findMany({ ...query });
    },
  }),
}));

builder.mutationFields((t) => ({
  addDevice: t.withAuth({ isAdmin: true }).prismaField({
    type: "Device",
    args: {
      owner: t.arg.string({ required: true }),
      location: t.arg.string({ required: true }),
      lastAccessed: t.arg.string({ required: true }),
      suspected: t.arg.boolean({ required: true }),
    },
    resolve: async (query, _root, args, _ctx) => {
      return await prisma.device.create({
        data: args,
        ...query,
      });
    },
  }),
  addDeviceToMission: t.withAuth({ isAdmin: true }).field({
    type: "Boolean",
    args: {
      deviceId: t.arg.string({ required: true }),
      missionid: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, _ctx) => {
      try {
        await prisma.device.update({
          where: {
            id: args.deviceId,
          },
          data: {
            missionId: args.missionid,
          },
        });
        return true;
      } catch (e) {
        return false;
      }
    },
  }),
  unlinkDevice: t.withAuth({ isAdmin: true }).field({
    type: "Boolean",
    args: {
      deviceId: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, _ctx) => {
      try {
        await prisma.device.update({
          where: {
            id: args.deviceId,
          },
          data: {
            missionId: null,
          },
        });
        return true;
      } catch (e) {
        return false;
      }
    },
  }),
}));
