import { useState } from 'react';
import { startOfWeek, addDays, format, isWithinInterval } from 'date-fns';
import TaskBar from './TaskBar';

interface Task {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  status: string;
}

interface GanttChartProps {
  tasks: Task[];
}

export default function GanttChart({ tasks }: GanttChartProps) {
  const [startDate, setStartDate] = useState(startOfWeek(new Date()));
  const daysToShow = 14;

  const dateHeaders = Array.from({ length: daysToShow }, (_, i) => addDays(startDate, i));

  const getTaskPosition = (task: Task) => {
    const taskStart = new Date(task.start_date);
    const taskEnd = new Date(task.end_date);
    const startOffset = Math.max(0, (taskStart.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    const duration = Math.min(daysToShow - startOffset, (taskEnd.getTime() - taskStart.getTime()) / (1000 * 3600 * 24));
    return { startOffset, duration };
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        <div className="flex border-b">
          <div className="w-48 flex-shrink-0 p-2 font-bold">Task</div>
          {dateHeaders.map((date) => (
            <div key={date.toISOString()} className="w-16 flex-shrink-0 p-2 text-center font-bold">
              {format(date, 'MM/dd')}
            </div>
          ))}
        </div>
        {tasks.map((task) => {
          const { startOffset, duration } = getTaskPosition(task);
          return (
            <div key={task.id} className="flex border-b">
              <div className="w-48 flex-shrink-0 p-2">{task.title}</div>
              <div className="flex-grow relative h-8">
                <TaskBar
                  task={task}
                  startOffset={startOffset}
                  duration={duration}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}