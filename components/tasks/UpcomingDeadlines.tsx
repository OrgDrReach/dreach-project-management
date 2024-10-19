import { format } from 'date-fns';
import Link from 'next/link';

interface Deadline {
  id: string;
  title: string;
  due_date: string;
  project_id: string;
  projects: { name: string };
}

interface UpcomingDeadlinesProps {
  deadlines: Deadline[];
}

export default function UpcomingDeadlines({ deadlines }: UpcomingDeadlinesProps) {
  return (
    <ul className="space-y-2">
      {deadlines.map((deadline) => (
        <li key={deadline.id} className="flex justify-between items-center">
          <div>
            <Link href={`/projects/${deadline.project_id}`} className="font-medium hover:underline">
              {deadline.title}
            </Link>
            <p className="text-sm text-gray-500">{deadline.projects.name}</p>
          </div>
          <span className="text-sm">{format(new Date(deadline.due_date), 'MMM d, yyyy')}</span>
        </li>
      ))}
    </ul>
  );
}