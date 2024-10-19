import { useState } from 'react';
import { startOfWeek, addDays, format, isWithinInterval, addBusinessDays } from 'date-fns';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskBar, { TaskBarProps } from './TaskBar';
import { Task } from '../../types/calendar';  // Import the Task type

// Update the Task interface to include start_date and end_date
interface ExtendedTask extends Task {
  start_date: string;
  end_date: string;
}

interface GanttChartProps {
  tasks: ExtendedTask[];
  onTaskUpdate: (updatedTask: ExtendedTask) => void;
}

export default function GanttChart({ tasks, onTaskUpdate }: GanttChartProps) {
  const [startDate, setStartDate] = useState(startOfWeek(new Date()));
  const daysToShow = 14;

  const dateHeaders = Array.from({ length: daysToShow }, (_, i) => addDays(startDate, i));

  const getTaskPosition = (task: ExtendedTask) => {
    const taskStart = new Date(task.start_date);
    const taskEnd = new Date(task.end_date);
    const startOffset = Math.max(0, (taskStart.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    const duration = Math.min(daysToShow - startOffset, (taskEnd.getTime() - taskStart.getTime()) / (1000 * 3600 * 24));
    return { startOffset, duration };
  };

  const handleTaskMove = (taskId: number, newStartOffset: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const oldStartDate = new Date(task.start_date);
    const oldEndDate = new Date(task.end_date);
    const duration = (oldEndDate.getTime() - oldStartDate.getTime()) / (1000 * 3600 * 24);

    const newStartDate = addDays(startDate, newStartOffset);
    const newEndDate = addBusinessDays(newStartDate, duration);

    const updatedTask: ExtendedTask = {
      ...task,
      start_date: newStartDate.toISOString(),
      end_date: newEndDate.toISOString(),
    };

    onTaskUpdate(updatedTask);
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
                    onMove={(newStartOffset: number) => handleTaskMove(task.id, newStartOffset)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DndProvider>
  );
}
