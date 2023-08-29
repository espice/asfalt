"use client"

import Input from "@/components/Input";
import styles from "./index.module.scss";
import { useState } from "react";
import LogCard from "./logcard";

const Logs = () => {
    const [search, setSearch] = useState("");
    return (
        <div className={styles.container}>
            <div className={styles.container__heading}>
                <h2 className={styles.container__heading__heading}>All Logs</h2>
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
                <LogCard remove={() => {}} log={{id: '939495284', name: '\"I pooped my pants\"', owner: 'Kabir Bhalla', lastAccessed: '2hrs ago', device: 'Sim #860222' }} />
                <LogCard remove={() => {}} log={{id: '939495284', name: '\"I pooped my pants\"', owner: 'Kabir Bhalla', lastAccessed: '2hrs ago', device: 'Sim #860222' }} />
            </div>
        </div>
    )
}

export default Logs;