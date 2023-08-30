"use client";

import Input from "@/components/Input";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import LogCard from "./logcard";
import { gqlClient } from "@/utils/gql";

const Logs = ({ missionId }: { missionId: string }) => {
  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState<any[]>([]);

  async function getLogs() {
    const res = await gqlClient.query({
      flaggedLogs: {
        __args: {
          missionId,
        },
        id: true,
        message: true,
        time: true,
        flagged: true,
        device: {
          id: true,
          owner: true,
        },
      },
    });
    setLogs(res.flaggedLogs);
  }

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container__heading}>
        <h2 className={styles.container__heading__heading}>All Flagged Logs</h2>
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
      <div className={styles.container__logs}>
        {logs.map((log) => {
          return (
            <LogCard
              key={log.id}
              remove={async () => {
                await gqlClient.mutation({
                  unflagLog: {
                    __args: {
                      logId: log.id,
                    },
                  },
                });
              }}
              log={{
                id: log.device.id,
                name: `"${log.message}"`,
                owner: log.device.owner,
                lastAccessed: log.time,
                device: `Sim #${log.device.id.substr(
                  log.device.id.length - 5
                )}`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Logs;
