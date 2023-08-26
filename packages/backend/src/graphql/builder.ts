import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import { GraphQLError } from "graphql";
import { PrismaPlugin } from "@cw23/database";
import type { PothosPrismaTypes } from "@cw23/database";
import { prisma } from "../client/prisma";
import { GraphQLContext } from "./context";
import { isAdmin } from "./permission";

export interface BuilderType {
  Context: GraphQLContext;
  PrismaTypes: PothosPrismaTypes;
  AuthScopes: {
    loggedIn: boolean;
    isAdmin: boolean;
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
  }),
  prisma: {
    client: prisma,
  },
});

builder.queryType();
builder.mutationType();
