'use client';

import { useRouter } from 'next/navigation';
import styles from './missionCard.module.scss';

const MissionCard = ({ mission }: { mission: any }) => {
  const router = useRouter();

  return (
    <div className={styles.card}>
      <div className={styles.card__title}>{mission.title}</div>
      <div className={styles.card__info}>
        <div>Devices Tracking: {mission.deviceCount}</div>
        <div>Suspects Identified: {mission.suspectCount}</div>
        <div>Agents Assigned: {mission.agentCount}</div>
      </div>
      <div
        className={styles.card__action}
        onClick={() => {
          router.push(`/dadacon/mission/${mission.id}`);
        }}
      >
        Go to Mission →
      </div>
    </div>
  );
};

export default MissionCard;
