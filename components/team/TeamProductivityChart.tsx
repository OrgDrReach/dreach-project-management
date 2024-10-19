'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TeamProductivityData {
  user_name: string;
  tasks_completed: number;
  hours_logged: number;
}

interface TeamProductivityChartProps {
  data: TeamProductivityData[];
}

export default function TeamProductivityChart({ data }: TeamProductivityChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="user_name" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="tasks_completed" fill="#8884d8" name="Tasks Completed" />
        <Bar yAxisId="right" dataKey="hours_logged" fill="#82ca9d" name="Hours Logged" />
      </BarChart>
    </ResponsiveContainer>
  );
}