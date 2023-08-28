import { gqlClientServer } from "@/utils/gql-server";
import { notFound } from "next/navigation";
import Devices from "./Devices";

async function getDevices(missionId: string) {
  try {
    const res = await gqlClientServer().query({
      mission: {
        __args: {
          missionId,
        },
        devices: {
          id: true,
          owner: true,
          location: true,
          lastAccessed: true,
          suspected: true,
        },
      },
    });

    return res.mission.devices;
  } catch (e) {
    return null;
  }
}

export default async function MissionDevices({
  params: { id: missionId },
}: {
  params: { id: string };
}) {
  const devices = await getDevices(missionId);
  if (!devices) return notFound();

  return (
    <div>
      <Devices devices={devices} missionId={missionId} />
    </div>
  );
}
