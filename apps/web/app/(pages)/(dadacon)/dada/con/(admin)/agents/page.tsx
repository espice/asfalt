import { gqlClientServer } from "@/utils/gql-server";
import Agents from "./agents";

async function getAgents() {
  const agents = await gqlClientServer().query({
    agents: {
      username: true,
      id: true,
      isAdmin: true,
      sessions: {
        id: true,
        ip: true,
        device: true,
      },
    },
  });

  return agents.agents;
}

export default async function AgentsPage() {
  const agents = await getAgents();

  return (
    <div>
      <Agents agents={agents}/>
    </div>
  );
}
