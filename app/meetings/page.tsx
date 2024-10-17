import { createClient } from "@/utils/supabase/server";
import MeetingList from "@/components/meetings/MeetingList";
import CreateMeetingForm from "@/components/meetings/CreateMeetingForm";

export default async function MeetingsPage() {
  const supabase = createClient();
  const { data: meetings, error } = await supabase
    .from("meetings")
    .select("*, created_by(first_name, last_name)")
    .order("start_time", { ascending: true });

  if (error) {
    console.error("Error fetching meetings:", error);
    return <div>Error loading meetings</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Meeting Management</h1>
      <CreateMeetingForm />
      <MeetingList meetings={meetings} />
    </div>
  );
}