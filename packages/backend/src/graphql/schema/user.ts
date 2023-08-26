import { builder } from "../builder";
import { prisma } from "../../client/prisma";
import {
  uniqueNamesGenerator,
  animals,
  adjectives,
} from "unique-names-generator";
import bcrypt from "bcrypt";

builder.prismaObject("User", {
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

builder.prismaObject("Session", {
  fields: (t) => ({
    id: t.exposeID("id"),
    ip: t.exposeString("ip"),
    device: t.exposeString("device"),
    createdAt: t.string({
      resolve: (root) => {
        return root.createdAt.toISOString();
      },
    }),
  }),
  authScopes: {
    isAdmin: true,
  },
});

builder.queryFields((t) => ({
  me: t.withAuth({ loggedIn: true }).prismaField({
    type: "User",
    resolve: async (query, _root, _args, ctx) => {
      return await prisma.user.findUniqueOrThrow({
        where: {
          id: ctx.userId,
        },
        ...query,
      });
    },
  }),
  agents: t.withAuth({ isAdmin: true }).prismaField({
    type: ["User"],
    resolve: async (query, _root, _args, ctx) => {
      return await prisma.user.findMany({ ...query });
    },
  }),
}));

builder.mutationFields((t) => ({
  addAgent: t.withAuth({ loggedIn: true, isAdmin: true }).field({
    type: "Boolean",
    args: {
      id: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      console.log("here");
      try {
        const username = uniqueNamesGenerator({
          dictionaries: [adjectives, animals],
          length: 2,
          separator: "_",
        });

        const password = await bcrypt.hash(args.password, 15);

        await prisma.user.create({
          data: {
            id: args.id,
            password,
            username,
          },
        });

        return true;
      } catch (e) {
        return false;
      }
    },
  }),
}));
