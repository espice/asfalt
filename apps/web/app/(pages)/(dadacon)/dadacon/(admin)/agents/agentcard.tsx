"use client";

import SecondaryButton from "@/components/SecondaryButton";
import styles from "./index.module.scss";
import { gqlClient } from "@/utils/gql";
import { Popup } from "@/components/Popup";
import { useRef, useState } from "react";

const AgentCard = ({
  agent,
  i,
  remove,
}: {
  agent: any;
  i: number;
  remove: Function;
}) => {
  const sessionRef = useRef(null);
  const [showSess, setShowSes] = useState(false);
  async function removeAgent(agentId: string) {
    remove(i);
    const res = await gqlClient.mutation({
      removeAgent: {
        __args: {
          id: agentId,
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
        <SecondaryButton
          className={styles.card__buttons__button}
          onClick={() => {
            setShowSes(true);
          }}
        >
          Sessions
        </SecondaryButton>
        <SecondaryButton
          className={styles.card__buttons__dangerbutton}
          onClick={() => {
            removeAgent(agent?.id);
          }}
        >
          Remove
        </SecondaryButton>
      </div>
      <Popup
        ref={sessionRef}
        popupState={showSess}
        crossHandler={() => {
          setShowSes(false);
        }}
      >
        <div className={styles.sessions}>
          <h2 className={styles.sessions__heading}>Sessions - {agent?.id}</h2>
          {agent?.sessions.map((session: any, iter: any) => {
            let date = new Date(session?.createdAt);
            return (
              <div key={session.id} className={styles.sessions__session}>
                <h3 className={styles.sessions__session__time}>
                  {date.toUTCString()}
                </h3>
                <h3 className={styles.sessions__session__ip}>
                  IP: {session?.ip}
                </h3>
                <h3 className={styles.sessions__session__agent}>
                  User Agent: {session?.device}
                </h3>
              </div>
            );
          })}
        </div>
      </Popup>
    </div>
  );
};

export default AgentCard;
