"use client";

import { useState } from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Task {
  id: string;
  title: string;
  due_date: string;
  project_id: string;
  projects: { name: string };
}

interface Meeting {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
}

interface CalendarTimelineProps {
  tasks: Task[];
  meetings: Meeting[];
}

export default function CalendarTimeline({ tasks, meetings }: CalendarTimelineProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(currentDate), i));

  const getEventsForDay = (date: Date) => {
    const dayTasks = tasks.filter((task) => isSameDay(new Date(task.due_date), date));
    const dayMeetings = meetings.filter((meeting) => isSameDay(new Date(meeting.start_time), date));
    return [...dayTasks, ...dayMeetings];
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button onClick={() => setCurrentDate(addDays(currentDate, -7))}>Previous Week</button>
        <h2 className="text-xl font-semibold">{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={() => setCurrentDate(addDays(currentDate, 7))}>Next Week</button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day) => (
          <Card key={day.toISOString()}>
            <CardHeader>
              <CardTitle>{format(day, "EEE dd")}</CardTitle>
            </CardHeader>
            <CardContent>
              {getEventsForDay(day).map((event) => (
                <div key={event.id} className="text-sm mb-1">
                  {event.title}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}