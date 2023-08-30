"use client";

import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { gqlClient } from "@/utils/gql";
import SecondaryButton from "@/components/SecondaryButton";

export default function AddAgentPopup({
  existingAgents,
  addAgent,
  closeModal,
  missionId,
}: {
  existingAgents: string[];
  addAgent: (agent: any) => void;
  closeModal: () => void;
  missionId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [agents, setAgents] = useState<any[]>([]);
  const [ogAgents, setOgAgents] = useState<any[]>([]);

  async function getAgents() {
    const res = await gqlClient.query({
      agents: {
        id: true,
        username: true,
      },
    });

    const a: any[] = [];
    res.agents.forEach((agent: any) => {
      if (!existingAgents.includes(agent.id)) {
        a.push(agent);
      }
    });

    setAgents(a);
    setOgAgents(res.agents);
    setLoading(false);
  }

  useEffect(() => {
    getAgents();
  }, []);

  useEffect(() => {
    const a: any[] = [];
    ogAgents.forEach((ag: any) => {
      if (!existingAgents.includes(ag.id)) {
        a.push(ag);
      }
    });
    setAgents(a);
  }, [existingAgents]);

  return (
    <div className={styles.adddiv}>
      <h1 className={styles.adddiv__heading}>Add an Agent</h1>
      {loading ? (
        <div className="text-white/[0.5]">Loading...</div>
      ) : (
        <div>
          {agents.map((agent: any, idx) => {
            return (
              <div key={agent.id} className="flex w-full py-6 border-b-[1px] border-white/[0.2] items-center justify-between">
                <p className="text-[20px] text-white">{agent.id}</p>
                <SecondaryButton
                  onClick={async () => {
                    setLoadingIndex(idx);

                    await gqlClient.mutation({
                      addAgentToMission: {
                        __args: {
                          agentId: agent.id,
                          missionId,
                        },
                      },
                    });

                    addAgent(agent);

                    // const a: any[] = [];
                    // agents.forEach((ag: any) => {
                    //   if (![...existingAgents, agent.id].includes(ag.id)) {
                    //     a.push(ag);
                    //   }
                    // });
                    // setAgents(a);
                    setLoadingIndex(null);
                    closeModal();
                  }}
                >
                  {loadingIndex === idx ? "..." : "Add"}
                </SecondaryButton>
              </div>
            );
          })}
          <div className="text-white/[0.5]">
            {" "}
            {agents.length === 0 ? "No more Agents to add" : ""}
          </div>
        </div>
      )}
    </div>
  );
}
