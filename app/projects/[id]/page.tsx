import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TaskList from "@/components/tasks/TaskList";
import CreateTaskForm from "@/components/tasks/CreateTaskForm";

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !project) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{project.description}</p>
          <p className="mt-2">Status: {project.status}</p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <CreateTaskForm projectId={project.id} />
      <TaskList projectId={project.id} />
    </div>
  );
}