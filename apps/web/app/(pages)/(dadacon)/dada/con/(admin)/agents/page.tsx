import { gqlClient } from "@/utils/gql";

async function getAgents() {
  const agents = await gqlClient().query({
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
