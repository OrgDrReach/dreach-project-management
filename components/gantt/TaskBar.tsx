interface TaskBarProps {
  task: {
    id: string;
    title: string;
    status: string;
  };
  startOffset: number;
  duration: number;
}

export default function TaskBar({ task, startOffset, duration }: TaskBarProps) {
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
      className={`absolute h-6 rounded ${getStatusColor(task.status)}`}
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
}