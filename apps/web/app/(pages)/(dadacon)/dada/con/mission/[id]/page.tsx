export default function MissionPage({
  params: { id: missionId },
}: {
  params: { id: string };
}) {
  return <div>mission page - {missionId} </div>;
}
