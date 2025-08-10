import { useRouter } from 'next/router';
import actions from '@cyberidle/content/actions.json';
import districts from '@cyberidle/content/districts.json';
import { ActionCard } from '../../../components/actions/ActionCard';

export default function ModulePage() {
  const router = useRouter();
  const { id, module } = router.query as { id: string; module: string };
  const district = districts.find((d) => d.id === id);
  const list = actions.filter((a) => a.districtId === id && a.type === module);
  if (!district) return <div>Unknown district</div>;
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl capitalize">{module}</h1>
      {list.map((a) => (
        <ActionCard key={a.id} action={a} />
      ))}
    </div>
  );
}
