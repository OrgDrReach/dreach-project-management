import { createClient } from "@/utils/supabase/server";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  assignee_id: string | null;
  due_date: string | null;
}

export default async function TaskList({ projectId }: { projectId: string }) {
  const supabase = createClient();
  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*, employees(first_name, last_name)")
    .eq("project_id", projectId);

  if (error) {
    console.error("Error fetching tasks:", error);
    return <div>Error loading tasks</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task: Task) => (
        <Card key={task.id}>
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{task.description}</p>
            <p className="mt-2">Status: {task.status}</p>
            {task.assignee_id && (
              <p>Assignee: {task.employees.first_name} {task.employees.last_name}</p>
            )}
            {task.due_date && (
              <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}