"use client"

import Input from "@/components/Input";
import styles from "./index.module.scss";
import { useState } from "react";
import SecondaryButton from "@/components/SecondaryButton";

const Devices = () => {
    const [search, setSearch] = useState("");
    return (
        <div className={styles.container}>
            <div className={styles.container__heading}>
                <h2 className={styles.container__heading__heading}>All Devices</h2>
                <Input value={search} placeholder='Search...' type='text' onChange={(e: any) => {setSearch(e?.target?.value)}} className={styles.container__heading__input} />
            </div>
            <div className={styles.container__devices}>
                <div className={styles.container__devices__device}>
                    <div className={styles.container__devices__device__text}>
                        <h2 className={styles.container__devices__device__text__heading}>Sim #90123</h2>
                        <h2 className={styles.container__devices__device__text__info}>Owner: Md. Ashraf</h2>
                        <h2 className={styles.container__devices__device__text__info}>Location: LOC, Pakistan</h2>
                        <h2 className={styles.container__devices__device__text__info}>Last Used: 2hrs ago</h2>
                    </div>
                    <div className={styles.container__devices__device__uh}>
                        <div style={{display: 'flex', marginLeft: 'auto', alignItems: 'center', gap: '8px'}}>
                            <h2 className={styles.container__devices__device__uh__danger}>Suspected of Criminal Activity</h2>
                            <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.25 16.25H13.75V8.75H16.25M16.25 21.25H13.75V18.75H16.25M15 2.5C13.3585 2.5 11.733 2.82332 10.2165 3.45151C8.69989 4.07969 7.3219 5.00043 6.16117 6.16117C3.81696 8.50537 2.5 11.6848 2.5 15C2.5 18.3152 3.81696 21.4946 6.16117 23.8388C7.3219 24.9996 8.69989 25.9203 10.2165 26.5485C11.733 27.1767 13.3585 27.5 15 27.5C18.3152 27.5 21.4946 26.183 23.8388 23.8388C26.183 21.4946 27.5 18.3152 27.5 15C27.5 13.3585 27.1767 11.733 26.5485 10.2165C25.9203 8.69989 24.9996 7.3219 23.8388 6.16117C22.6781 5.00043 21.3001 4.07969 19.7835 3.45151C18.267 2.82332 16.6415 2.5 15 2.5Z" fill="#E81313"/>
                            </svg>
                        </div>
                        <SecondaryButton className={styles.container__devices__device__uh__button}>Add to Cluster</SecondaryButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Devices;