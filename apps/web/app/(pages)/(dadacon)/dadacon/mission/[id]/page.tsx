import { gqlClientServer } from "@/utils/gql-server";
import { notFound } from "next/navigation";
import Logs from "./logs";


export default async function MissionPage({
  params: { id: missionId },
}: {
  params: { id: string };
}) {

  return (
    <div>
        <Logs />
    </div>
  );
}