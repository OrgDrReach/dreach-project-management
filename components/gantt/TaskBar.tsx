import React, { useRef, useEffect } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';

export interface TaskBarProps {
  task: {
    id: string;
    title: string;
    status: string;
  };
  startOffset: number;
  duration: number;
  onMove: (taskId: string, newStartOffset: number) => void;
}

interface DragItem {
  id: string;
  startOffset: number;
}

interface DropResult {
  startOffset: number;
}

export default function TaskBar({ task, startOffset, duration, onMove }: TaskBarProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag<DragItem, DropResult, { isDragging: boolean }>({
    type: 'TASK',
    item: { id: task.id, startOffset },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onMove(task.id, dropResult.startOffset);
      }
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Use useEffect to apply the drag ref
  useEffect(() => {
    if (ref.current) {
      drag(ref);
    }
  }, [drag]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
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

  return (
    <div
      ref={ref}
      className={`absolute h-6 rounded ${getStatusColor(task.status)} ${isDragging ? 'opacity-50' : ''}`}
      style={{
        left: `${startOffset * 4}rem`,
        width: `${duration * 4}rem`,
        top: '0.25rem',
        cursor: 'move',
      }}
      title={task.title}
    >
      <span className="text-xs text-white px-1 truncate block">{task.title}</span>
    </div>
  );
}
