'use client'

import Input from '@/components/Input';
import styles from './index.module.scss';
import { useState } from 'react';
import AgentCard from './agentcard';
import Button from '@/components/Button';


const Agents = ({agents}:{agents: Array<any>}) => {
    const [search, setSearch] = useState('');

    return (
        <div className={styles.container} >
            <Button className={styles.add} onClick={() => {}}> 
            Add Agent
            </Button>
            <div className={styles.container__heading}>
                <h2 className={styles.container__heading__heading}>All Agents</h2>
                <Input value={search} placeholder='Search...' type='text' onChange={(e: any) => {setSearch(e?.target?.value)}} className={styles.container__heading__input} />
            </div>
            <div className={styles.container__agents}>
            {agents.map((agent, iter) => {
                    return (
                        <div key={iter}>
                            <AgentCard  key={iter} agent={agent} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Agents;