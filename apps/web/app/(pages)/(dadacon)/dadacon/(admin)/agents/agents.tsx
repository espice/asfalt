"use client";

import Input from "@/components/Input";
import styles from "./index.module.scss";
import { useRef, useState } from "react";
import AgentCard from "./agentcard";
import Button from "@/components/Button";
import { Popup } from "@/components/Popup";
import SecondaryButton from "@/components/SecondaryButton";
import { gqlClient } from "@/utils/gql";

const Agents = ({ agents }: { agents: Array<any> }) => {
  const [search, setSearch] = useState("");
  const [addShow, setAddShow] = useState(false);
  const [adduser, setAdduser] = useState("");
  const [realAgents, setRealAgents] = useState(agents);
  const [password, setPassword] = useState("");
  const addRef = useRef(null);

  async function addAgent(agentId: string, password: string) {
    const res = await gqlClient.mutation({
      addAgent: {
        __args: {
          id: agentId,
          password: password,
        },
        username: true,
        id: true,
        isAdmin: true,
        sessions: {
          id: true,
          ip: true,
          createdAt: true,
          device: true,
        },
      },
    });
    setAddShow(false);
    setRealAgents([...realAgents, res.addAgent]);
    console.log(res);
  }

  function removeAgent({ i }: { i: number }) {
    console.log("hello");
    setRealAgents(realAgents.splice(i, 1));
  }

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
        <h2 className={styles.container__heading__heading}>All Agents</h2>
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
        <div className={styles.adddiv}>
          <h1 className={styles.adddiv__heading}>Add an Agent</h1>
          <Input
            value={adduser}
            type="text"
            className={styles.adddiv__input}
            placeholder="Username"
            onChange={setAdduser}
          ></Input>
          <Input
            value={password}
            type="password"
            className={styles.adddiv__input}
            placeholder="Password"
            onChange={setPassword}
          ></Input>
          <SecondaryButton
            onClick={() => {
              console.log(adduser, password), addAgent(adduser, password);
            }}
            className={styles.adddiv__button}
          >
            Create
          </SecondaryButton>
        </div>
      </Popup>
    </div>
  );
};

export default Agents;
