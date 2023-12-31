
import { gqlClientServer } from '@/utils/gql-server';
import { notFound } from 'next/navigation';
import MissionCard from './missionCard';
import styles from './index.module.scss';
import MissionPopup from './missionPopup';

async function getMissions() {
  try {
    const { missions } = await gqlClientServer().query({
      missions: {
        id: true,
        title: true,
        suspectCount: true,
        deviceCount: true,
        agentCount: true,
      },
    });

    return missions;
  } catch (e) {
    return null;
  }
}

export default async function DadaConDashboard() {
  const missions = await getMissions();

  if (!missions) return notFound();

  return (
    <div className={styles.main}>
      <h1 className={styles.main__title}>All Clusters</h1>
      <div className={styles.main__cards}>
        {missions.map((mission: any) => {
          return <MissionCard mission={mission} key={mission.id}></MissionCard>;
        })}
      </div>

      <div className={styles.main__action}>
        <MissionPopup />
      </div>
    </div>
  );
}
