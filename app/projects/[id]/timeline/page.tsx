import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import GanttChart from "@/components/gantt/GanttChart";

export default async function ProjectTimelinePage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .single();

  if (projectError || !project) {
    notFound();
  }

  const { data: tasks, error: tasksError } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", params.id)
    .order("start_date", { ascending: true });

  if (tasksError) {
    console.error("Error fetching tasks:", tasksError);
    return <div>Error loading project timeline</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{project.name} - Timeline</h1>
      <GanttChart tasks={tasks || []} />
    </div>
  );
}