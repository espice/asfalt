import { gqlClientServer } from "@/utils/gql-server";
import Agents from "./agents";
import { useState } from "react";

async function getAgents() {
  const agents = await gqlClientServer().query({
    agents: {
      username: true,
      id: true,
      isAdmin: true,
      sessions: {
        id: true,
        ip: true,
        createdAt: true,
        device: true,
      },
    },
  });

  return agents.agents;
}

export default async function AgentsPage() {
  let agents = await getAgents();
 
  return (
    <div>
      <Agents agents={agents} />
    </div>
  );
}
