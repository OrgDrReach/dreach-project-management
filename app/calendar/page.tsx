import { createClient } from "@/utils/supabase/server";
import CalendarTimeline from "@/components/calendar/CalendarTimeline";
import { Task, Meeting, TaskWithProject } from "@/types/calendar";
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export default async function CalendarPage() {
  const supabase = createClient();
  
  // Fetch tasks
  const { data: tasks, error: tasksError }: PostgrestSingleResponse<TaskWithProject[]> = await supabase
    .from("tasks")
    .select("id, title, due_date, project_id, projects(name)")
    .order("due_date", { ascending: true });

  // Fetch meetings
  const { data: meetings, error: meetingsError }: PostgrestSingleResponse<Meeting[]> = await supabase
    .from("meetings")
    .select("id, title, start_time, end_time")
    .order("start_time", { ascending: true });

  if (tasksError || meetingsError) {
    console.error("Error fetching calendar data:", tasksError || meetingsError);
    return <div>Error loading calendar data</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calendar Timeline</h1>
      <CalendarTimeline tasks={tasks || []} meetings={meetings || []} />
    </div>
  );
}
