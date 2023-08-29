"use client";

import Input from "@/components/Input";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import DeviceCard from "./DeviceCard";

const Devices = ({
  devices: devicesData,
  missionId,
}: {
  devices: any[];
  missionId: string;
}) => {
  const [search, setSearch] = useState("");
  const [devices, setDevices] = useState<any[]>([]);

  useEffect(() => {
    setDevices(devicesData);
  }, []);

  useEffect(() => {
    console.log("devices changed");
  }, [devices]);

  function removeDevice(i: number) {
    console.log(i);
    const d = devices;
    d.splice(i, 1);
    console.log(d);
    setDevices([...d]);
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__heading}>
        <h2 className={styles.container__heading__heading}>All Devices</h2>
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
      <div className={styles.container__devices}>
        {devices.map((device, i) => {
          return (
            <DeviceCard
              key={device.id}
              device={device}
              remove={() => removeDevice(i)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Devices;
