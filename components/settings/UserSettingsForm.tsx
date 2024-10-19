'use client';

import { useState } from 'react';
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface UserSettingsFormProps {
  initialSettings: {
    default_time_entry_duration?: number;
    auto_start_timer?: boolean;
  };
  userId: string;
}

export default function UserSettingsForm({ initialSettings, userId }: UserSettingsFormProps) {
  const [defaultDuration, setDefaultDuration] = useState(initialSettings.default_time_entry_duration || 30);
  const [autoStartTimer, setAutoStartTimer] = useState(initialSettings.auto_start_timer || false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();

    const { error } = await supabase
      .from('user_settings')
      .upsert({
        user_id: userId,
        default_time_entry_duration: defaultDuration,
        auto_start_timer: autoStartTimer
      });

    if (error) {
      console.error('Error updating user settings:', error);
    } else {
      alert('Settings updated successfully');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="defaultDuration">Default Time Entry Duration (minutes)</Label>
        <Input
          id="defaultDuration"
          type="number"
          value={defaultDuration}
          onChange={(e) => setDefaultDuration(Number(e.target.value))}
          min={1}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="autoStartTimer"
          checked={autoStartTimer}
          onCheckedChange={setAutoStartTimer}
        />
        <Label htmlFor="autoStartTimer">Auto-start timer when task is set to "In Progress"</Label>
      </div>
      <Button type="submit">Save Settings</Button>
    </form>
  );
}