import { useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/client";
import { format } from 'date-fns';

interface TimeEntry {
  id: string;
  start_time: string;
  end_time: string;
  duration: number;
  description: string;
  user: { first_name: string; last_name: string };
}

interface TimeLogViewProps {
  taskId: string;
}

export default function TimeLogView({ taskId }: TimeLogViewProps) {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

  useEffect(() => {
    const fetchTimeEntries = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('time_entries')
        .select('*, user:users(first_name, last_name)')
        .eq('task_id', taskId)
        .order('start_time', { ascending: false });

      if (error) {
        console.error('Error fetching time entries:', error);
      } else {
        setTimeEntries(data);
      }
    };

    fetchTimeEntries();
  }, [taskId]);

  return (
    <div>
      <h4 className="font-semibold mb-2">Time Log</h4>
      <ul className="space-y-2">
        {timeEntries.map((entry) => (
          <li key={entry.id} className="text-sm">
            <p>
              {entry.user.first_name} {entry.user.last_name} - {entry.duration} minutes
            </p>
            <p className="text-gray-500">
              {format(new Date(entry.start_time), 'MMM d, yyyy HH:mm')} - 
              {format(new Date(entry.end_time), 'MMM d, yyyy HH:mm')}
            </p>
            {entry.description && <p className="text-gray-600">{entry.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}