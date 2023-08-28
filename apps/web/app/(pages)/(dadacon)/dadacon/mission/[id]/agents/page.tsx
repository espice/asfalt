import { gqlClientServer } from "@/utils/gql-server";
import { notFound } from "next/navigation";
import Agents from "./Agents";

async function getAgents(missionId: string) {
  try {
    const res = await gqlClientServer().query({
      mission: {
        __args: {
          missionId,
        },
        agents: {
          id: true,
          username: true,
        },
      },
    });
    return res.mission.agents;
  } catch (e) {
    return null;
  }
}

export default async function MissionAgents({
  params: { id: missionId },
}: {
  params: { id: string };
}) {
  const agents = await getAgents(missionId);
  if (!agents) return notFound();

  return (
    <div className="bg-black pb-12">
      <Agents agents={agents} missionId={missionId} />
    </div>
  );
}
