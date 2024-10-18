import { Pie } from 'recharts';

// Define the type for a single data item
interface DataItem {
  name: string;
  value: number;
}

// Define the props type for the component
interface ProjectStatusChartProps {
  data: DataItem[];
}

export default function ProjectStatusChart({ data }: ProjectStatusChartProps) {
  return (
    <Pie
      data={data}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={80}
      fill="#8884d8"
      label
    />
  );
}
