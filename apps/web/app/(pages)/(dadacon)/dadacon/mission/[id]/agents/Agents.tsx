"use client";

import Input from "@/components/Input";
import styles from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import AgentCard from "./AgentCard";
import Button from "@/components/Button";
import { Popup } from "@/components/Popup";
import SecondaryButton from "@/components/SecondaryButton";
import { gqlClient } from "@/utils/gql";
import AddAgentPopup from "./AddAgentPopup";

const Agents = ({
  agents,
  missionId,
}: {
  agents: Array<any>;
  missionId: string;
}) => {
  const [search, setSearch] = useState("");
  const [addShow, setAddShow] = useState(false);
  const [adduser, setAdduser] = useState("");
  const [realAgents, setRealAgents] = useState(agents);
  const [password, setPassword] = useState("");
  const addRef = useRef(null);

  function removeAgent({ i }: { i: number }) {
    setRealAgents(realAgents.splice(i, 1));
  }

  useEffect(() => {
    console.log("real agents changed");
  }, [realAgents]);

  return (
    <div className={styles.container}>
      <Button
        className={styles.add}
        onClick={() => {
          setAddShow(true), console.log("g");
        }}
      >
        Add Agent
      </Button>
      <div className={styles.container__heading}>
        <h2 className={styles.container__heading__heading}>Agents</h2>
        <Input
          value={search}
          placeholder="Search..."
          type="text"
          onChange={(e: any) => {
            setSearch(e?.target?.value);
          }}
          className={styles.container__heading__input}
        />
      </div>
      <div className={styles.container__agents}>
        {realAgents.map((agent, iter) => {
          return (
            <div key={iter}>
              <AgentCard
                key={iter}
                agent={agent}
                remove={removeAgent}
                i={iter}
                missionId={missionId}
              />
            </div>
          );
        })}
      </div>
      <Popup
        popupState={addShow}
        ref={addRef}
        crossHandler={() => {
          setAddShow(false);
        }}
      >
        <AddAgentPopup
          existingAgents={realAgents.map((a) => a.id)}
          addAgent={(agent) => setRealAgents([...realAgents, agent])}
          closeModal={() => setAddShow(false)}
          missionId={missionId}
        />
      </Popup>
    </div>
  );
};

export default Agents;
