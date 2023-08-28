import { GraphQLSchema } from "graphql";
import { builder } from "../builder";

// schema imports
import "./user";
import "./mission";

export const schema: GraphQLSchema = builder.toSchema();
