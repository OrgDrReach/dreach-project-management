import React from 'react';
import { useDrag } from 'react-dnd';
import { Task } from "@/types/calendar";

export interface TaskBarProps {
  task: Task;
  startOffset: number;
  duration: number;
  onMove: (newStartOffset: number) => void;
}

const TaskBar: React.FC<TaskBarProps> = ({ task, startOffset, duration, onMove }) => {
  const getStatusColor = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case 'in progress':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'overdue':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Use optional chaining and type assertion to safely access task.status
  const statusColor = getStatusColor((task as any).status);

  return (
    <div
      className={`absolute h-6 rounded ${statusColor}`}
      style={{
        left: `${startOffset * 4}rem`,
        width: `${duration * 4}rem`,
        top: '0.25rem',
      }}
      title={task.title}
    >
      <span className="text-xs text-white px-1 truncate block">{task.title}</span>
    </div>
  );
};

export default TaskBar;
