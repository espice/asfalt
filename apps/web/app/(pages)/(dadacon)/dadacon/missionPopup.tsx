"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import { Popup } from "@/components/Popup";
import { useRef, useState } from "react";
import styles from "./index.module.scss";
import SecondaryButton from "@/components/SecondaryButton";
import { gqlClient } from "@/utils/gql";

const MissionPopup = () => {
    const [show, setShow] = useState(false);
    const popupRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const makeMission = async (name: string) => {
        setLoading(true)
        const res = await gqlClient.mutation({
            createMission: {
              __args: {
                title: name
              },
            id: true,
            title: true,
            suspectCount: true,
            deviceCount: true,
            agentCount: true,
            }
          });
          setLoading(false);
          console.log(res);   
    }
    return (
        <div>
            <Button onClick={() => {setShow(true)}}>New Mission</Button>
            <Popup popupState={show} ref={popupRef}>
                <div>
                    <div className={styles.adddiv}>
                        <h1 className={styles.adddiv__heading}>Create a Cluster</h1>
                        <Input
                            value={name}
                            type="text"
                            className={styles.adddiv__input}
                            placeholder="Name"
                            onChange={setName}
                        ></Input>
                        <SecondaryButton
                            onClick={() => {
                            console.log("s")
                            makeMission(name)
                            }}
                            disabled={loading}
                            className={styles.adddiv__button}
                        >
                            {!loading? "Create" : "Loading..."}
                        </SecondaryButton>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default MissionPopup;