import React from "react";
import { format } from "date-fns";

export type Deadline = {
  id: number;
  title: string;
  due_date: string;
  project_id: number;
  projects: {
    name: string;
  };
};

interface UpcomingDeadlinesProps {
  deadlines: Deadline[];
}

const UpcomingDeadlines: React.FC<UpcomingDeadlinesProps> = ({ deadlines }) => {
  return (
    <ul>
      {deadlines.map((deadline) => (
        <li key={deadline.id} className="mb-2">
          <span className="font-semibold">{deadline.title}</span> - 
          {deadline.projects.name} - 
          Due: {format(new Date(deadline.due_date), "MMM d, yyyy")}
        </li>
      ))}
    </ul>
  );
};

export default UpcomingDeadlines;
