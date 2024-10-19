import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface TimeEntry {
  duration: number;
  tasks: { project_id: string };
}

interface TimeSpentChartProps {
  timeEntries: TimeEntry[];
}

// Add this new interface
interface ProjectTimeData {
  [projectId: string]: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function TimeSpentChart({ timeEntries }: TimeSpentChartProps) {
  const projectTimeData = timeEntries.reduce<ProjectTimeData>((acc, entry) => {
    const projectId = entry.tasks.project_id;
    if (!acc[projectId]) {
      acc[projectId] = 0;
    }
    acc[projectId] += entry.duration;
    return acc;
  }, {});

  const data = Object.entries(projectTimeData).map(([projectId, duration]) => ({
    name: `Project ${projectId}`,
    value: duration,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
