import Devices from "./devices";
import { gqlClientServer } from "@/utils/gql-server";
import { notFound } from "next/navigation";

async function getDevices() {
  try {
    const res = await gqlClientServer().query({
      devices: {
        id: true,
        owner: true,
        location: true,
        lastAccessed: true,
        suspected: true,
        mission: {
          id: true,
          title: true,
        },
      },
    });

    return res.devices;
  } catch (e) {
    return null;
  }
}

export default async function DevicesPage() {
  const devices = await getDevices();
  if (!devices) return notFound();

  return (
    <div className="bg-black pb-12">
      <Devices devices={devices} />
    </div>
  );
}
