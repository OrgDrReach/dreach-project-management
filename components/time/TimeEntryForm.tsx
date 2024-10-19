import { useState } from 'react';
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimeEntryFormProps {
  taskId: string;
  onComplete: () => void;
}

export default function TimeEntryForm({ taskId, onComplete }: TimeEntryFormProps) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const start = new Date(startTime);
    const end = new Date(endTime);
    const duration = Math.round((end.getTime() - start.getTime()) / 60000); // duration in minutes

    const { error } = await supabase
      .from('time_entries')
      .insert({
        task_id: taskId,
        user_id: user.id,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        duration,
        description
      });

    if (error) {
      console.error('Error creating time entry:', error);
    } else {
      setStartTime('');
      setEndTime('');
      setDescription('');
      onComplete();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Button type="submit">Log Time</Button>
    </form>
  );
}