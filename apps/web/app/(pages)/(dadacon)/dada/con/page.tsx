import { gqlClient } from "@/utils/gql";
import { notFound } from "next/navigation";

async function getMissions() {
  try {
    const { missions } = await gqlClient().query({
      missions: {
        id: true,
        title: true,
        suspectCount: true,
        deviceCount: true,
        agentCount: true,
      },
    });

    return missions;
  } catch (e) {
    return null;
  }
}

export default async function DadaConDashboard() {
  const missions = await getMissions();

  if (!missions) return notFound();

  return (
    <div className="">
      {missions.map((mission) => {
        return <div>{mission.title}</div>;
      })}
    </div>
  );
}
