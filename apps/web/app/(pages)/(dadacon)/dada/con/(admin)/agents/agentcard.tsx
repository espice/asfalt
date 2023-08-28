"use client"

import Button from "@/components/Button";
import SecondaryButton from "@/components/SecondaryButton";
import styles from "./index.module.scss";
import { gqlClient } from "@/utils/gql";

const AgentCard = ({agent}:{agent: any}) => {
    console.log('hello')
    async function removeAgent(agentId: string) {
        const res = await gqlClient.mutation({
            removeAgent: {
                __args: {
                    id: agentId
                }
            }
        })
        console.log(res)
    }
    return (
        <div className={styles.card}>
            <div className={styles.card__text}>
                <h3 className={styles.card__text__name}>Agent: {agent?.id}</h3>
                <h4 className={styles.card__text__username}>Current username: {agent?.username}</h4>
            </div>
            <div className={styles.card__buttons}>
                <SecondaryButton className={styles.card__buttons__button} onClick={() => {}}>
                    Logs
                </SecondaryButton>
                <SecondaryButton className={styles.card__buttons__button} onClick={() => {}}>
                    Sessions
                </SecondaryButton>
                <SecondaryButton className={styles.card__buttons__dangerbutton} onClick={() => {removeAgent(agent?.id)}}>
                    Remove
                </SecondaryButton>
            </div>
        </div>
    )
}

export default AgentCard;