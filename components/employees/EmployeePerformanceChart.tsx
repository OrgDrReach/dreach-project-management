import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Define the shape of each data point
interface DataPoint {
  name: string;
  value: number;
}

// Define the props for the component
interface EmployeePerformanceChartProps {
  data: DataPoint[];
}

export default function EmployeePerformanceChart({ data }: EmployeePerformanceChartProps) {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
}
