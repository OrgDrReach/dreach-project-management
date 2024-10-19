'use client';

import { useState, useEffect } from 'react';
import { startOfWeek, addDays, format, isWithinInterval, addBusinessDays } from 'date-fns';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskBar, { TaskBarProps } from './TaskBar';
import { Task } from '@/types/calendar';  // Import the Task type
import { createClient } from "@/utils/supabase/server";

// Update the Task interface to include start_date, end_date, and status
interface ExtendedTask extends Task {
  id: number; // Explicitly define id as a number
  start_date: string;
  end_date: string;
  status: string;
}

interface GanttChartProps {
  tasks: ExtendedTask[];
  onTaskUpdate: (updatedTask: ExtendedTask) => void;
}

const GanttChart = ({ tasks }: GanttChartProps) => {
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

  const handleTaskMove = (taskId: string, newStartOffset: number) => {
    // Implement task update logic here
    console.log(`Task ${taskId} moved to start offset ${newStartOffset}`);
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
                    task={{
                      id: task.id.toString(), // Convert the number to a string
                      title: task.title,
                      status: task.status
                    }}
                    startOffset={startOffset}
                    duration={duration}
                    onMove={handleTaskMove}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DndProvider>
  );
};

export default GanttChart;
