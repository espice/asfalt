import React from "react";
import { gqlClientServer } from "@/utils/gql-server";
import { notFound } from "next/navigation";
import Nav from "./Nav";

async function getMission(missionId: string) {
  try {
    const res = await gqlClientServer().query({
      mission: {
        __args: {
          missionId,
        },
        id: true,
        title: true,
        deviceCount: true,
        agentCount: true,
      },
    });

    return res.mission;
  } catch (e) {
    return null;
  }
}

export default async function MissionPageLayout({
  children,
  params: { id: missionId },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const mission = await getMission(missionId);

  if (!mission) return notFound();

  return (
    <div className="relative w-full pt-[60px]">
      <Nav mission={mission}/>
      {children}
    </div>
  );
}
