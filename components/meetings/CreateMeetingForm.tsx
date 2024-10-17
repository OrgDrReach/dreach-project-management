"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { createCalendarEvent } from "@/utils/calendar/google-calendar";

export default function CreateMeetingForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    
    try {
      // Create Google Calendar event
      const calendarEvent = await createCalendarEvent(title, description, startTime, endTime);
      
      // Save meeting in Supabase
      const { data, error } = await supabase
        .from("meetings")
        .insert({
          title,
          description,
          start_time: startTime,
          end_time: endTime,
          google_meet_link: calendarEvent.hangoutLink,
          google_calendar_event_id: calendarEvent.id,
        });

      if (error) throw error;

      setTitle("");
      setDescription("");
      setStartTime("");
      setEndTime("");
      router.refresh();
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Meeting Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="startTime">Start Time</Label>
        <Input
          id="startTime"
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="endTime">End Time</Label>
        <Input
          id="endTime"
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Schedule Meeting</Button>
    </form>
  );
}