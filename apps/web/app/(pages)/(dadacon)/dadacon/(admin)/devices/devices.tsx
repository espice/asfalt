"use client";

import Input from "@/components/Input";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import SecondaryButton from "@/components/SecondaryButton";
import DeviceCard from "./deviceCard";

const Devices = ({ devices: devicesData }: { devices: any[] }) => {
  const [search, setSearch] = useState("");
  const [devices, setDevices] = useState(devicesData);

  useEffect(() => {
    console.log("devices changed");
  }, [devices]);

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
        {devices.map((device) => {
          return (
            <DeviceCard
              device={device}
              setDevices={setDevices}
              key={device.id + device.mission?.id.toString()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Devices;
