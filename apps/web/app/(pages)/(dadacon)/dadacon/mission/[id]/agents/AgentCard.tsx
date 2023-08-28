"use client";

import SecondaryButton from "@/components/SecondaryButton";
import styles from "./index.module.scss";
import { gqlClient } from "@/utils/gql";
import { useRef, useState } from "react";
import useUser from "@/utils/hooks/useUser";

const AgentCard = ({
  agent,
  i,
  remove,
  missionId,
}: {
  agent: any;
  i: number;
  remove: Function;
  missionId: string;
}) => {
  const user = useUser();

  async function removeAgent(agentId: string) {
    remove(i);
    const res = await gqlClient.mutation({
      removeAgentFromMission: {
        __args: {
          agentId,
          missionId,
        },
      },
    });
  }
  return (
    <div className={styles.card}>
      <div className={styles.card__text}>
        <h3 className={styles.card__text__name}>Agent: {agent?.id}</h3>
        <h4 className={styles.card__text__username}>
          Current username: {agent?.username}
        </h4>
      </div>
      <div className={styles.card__buttons}>
        {user?.id != agent.id && (
          <SecondaryButton
            className={styles.card__buttons__dangerbutton}
            onClick={() => {
              removeAgent(agent?.id);
            }}
          >
            Remove
          </SecondaryButton>
        )}
      </div>
    </div>
  );
};

export default AgentCard;
