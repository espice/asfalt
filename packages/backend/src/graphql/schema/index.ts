import { GraphQLSchema } from "graphql";
import { builder } from "../builder";

// schema imports
import "./user";
import "./mission";
import "./device";

export const schema: GraphQLSchema = builder.toSchema();
