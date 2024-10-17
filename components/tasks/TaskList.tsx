"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import TaskCard from "./TaskCard";

export default function TaskList({ projectId }: { projectId: string }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("tasks")
      .select("*, assignee:employees(first_name, last_name)")
      .eq("project_id", projectId);

    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      setTasks(data);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onUpdate={fetchTasks} />
      ))}
    </div>
  );
}