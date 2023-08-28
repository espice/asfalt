import { gqlClientServer } from "@/utils/gql-server";

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

  return <div>{agents.length}</div>;
}
