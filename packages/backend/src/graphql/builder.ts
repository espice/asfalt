import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import { GraphQLError } from "graphql";
import { PrismaPlugin } from "@cw23/database";
import type { PothosPrismaTypes } from "@cw23/database";
import { prisma } from "../client/prisma";
import { GraphQLContext } from "./context";
import { hasMissionAccess, isAdmin, MissionAccessArgs } from "./permission";

export interface BuilderType {
  Context: GraphQLContext;
  PrismaTypes: PothosPrismaTypes;
  AuthScopes: {
    loggedIn: boolean;
    isAdmin: boolean;
    missionAccess: MissionAccessArgs;
  };
  AuthContexts: {
    loggedIn: GraphQLContext & { userId: string };
    isAdmin: GraphQLContext & { userId: string };
  };
}

export const builder = new SchemaBuilder<BuilderType>({
  scopeAuthOptions: {
    treatErrorsAsUnauthorized: true,
    unauthorizedError: () => new GraphQLError("Unauthorised"),
  },
  plugins: [ScopeAuthPlugin, PrismaPlugin],
  authScopes: async (ctx) => ({
    loggedIn: !!ctx.userId,
    isAdmin: await isAdmin(ctx),
    missionAccess: (args) => hasMissionAccess(ctx, args)
  }),
  prisma: {
    client: prisma,
  },
});

builder.queryType();
builder.mutationType();
