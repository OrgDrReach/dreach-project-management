import { createClient } from "@/utils/supabase/server";

export async function sendNotification(userId: string, title: string, message: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("notifications")
    .insert({ user_id: userId, title, message });

  if (error) {
    console.error("Error sending notification:", error);
  }
}