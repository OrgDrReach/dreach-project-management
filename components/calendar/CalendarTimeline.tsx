"use client";

import React from 'react';
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Task, Meeting } from "@/types/calendar";

interface CalendarTimelineProps {
  tasks: Task[];
  meetings: Meeting[];
}

const CalendarTimeline: React.FC<CalendarTimelineProps> = ({ tasks, meetings }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(currentDate), i));

  const getEventsForDay = (date: Date): Task[] => {
    const dayTasks = tasks.filter((task) => isSameDay(new Date(task.due_date), date));
    return dayTasks;
  };

  const isTask = (event: Task): boolean => 'due_date' in event;

  // Combine tasks and meetings into a single array of events
  const events = [
    ...getEventsForDay(currentDate).map(task => ({
      id: `task-${task.id}`,
      title: task.title,
      start: new Date(task.due_date),
      end: new Date(task.due_date),
      type: 'task' as const,
      projectName: task.projects?.[0]?.name || 'No Project'
    })),
    ...meetings.map(meeting => ({
      id: `meeting-${meeting.id}`,
      title: meeting.title,
      start: new Date(meeting.start_time),
      end: new Date(meeting.end_time),
      type: 'meeting' as const
    }))
  ];

  // Sort events by start time
  events.sort((a, b) => a.start.getTime() - b.start.getTime());

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
              {events.map((event) => (
                <div key={event.id} className="text-sm mb-1">
                  {event.title}
                  {event.type === 'task' && ` (Due: ${format(new Date(event.start), "HH:mm")})`}
                  {event.type === 'meeting' && ` (${format(new Date(event.start), "HH:mm")} - ${format(new Date(event.end), "HH:mm")})`}
                  {event.type === 'task' && <p>Project: {event.projectName}</p>}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CalendarTimeline;
