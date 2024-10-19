import { format } from 'date-fns';

interface TimeEntry {
  duration: number;
  start_time: string;
  users: { first_name: string; last_name: string };
  tasks: { title: string };
}

interface TimeTrackingSummaryProps {
  timeEntries: TimeEntry[];
}

export default function TimeTrackingSummary({ timeEntries }: TimeTrackingSummaryProps) {
  const totalTime = timeEntries.reduce((sum, entry) => sum + entry.duration, 0);
  const averageTime = totalTime / timeEntries.length || 0;

  return (
    <div>
      <p>Total time tracked: {Math.round(totalTime / 60)} hours</p>
      <p>Average time per entry: {Math.round(averageTime)} minutes</p>
      <h3 className="font-semibold mt-4 mb-2">Recent Time Entries</h3>
      <ul className="space-y-2">
        {timeEntries.slice(0, 5).map((entry, index) => (
          <li key={index} className="text-sm">
            <p>{entry.users.first_name} {entry.users.last_name} - {entry.tasks.title}</p>
            <p className="text-gray-500">
              {format(new Date(entry.start_time), 'MMM d, yyyy HH:mm')} - {entry.duration} minutes
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}