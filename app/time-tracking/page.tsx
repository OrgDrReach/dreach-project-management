import { createClient } from "@/utils/supabase/server";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TimeSpentChart from "@/components/time/TimeSpentChart";
import TimeTrackingSummary from "@/components/time/TimeTrackingSummary";
import DateRangeFilter from "@/components/time/DateRangeFilter";
import { useState } from 'react';
import GanttChart from '../../components/gantt/GanttChart';

type SearchParams = {
  [key: string]: string | string[] | undefined
};

export default async function TimeTrackingPage({ searchParams }: { searchParams: SearchParams }) {
  const supabase = createClient();
  
  const startDate = searchParams.startDate as string || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const endDate = searchParams.endDate as string || new Date().toISOString();

  // Fetch time tracking data
  const { data: timeEntries, error } = await supabase
    .from('time_entries')
    .select('*, tasks(title, project_id), users(first_name, last_name)')
    .gte('start_time', startDate)
    .lte('start_time', endDate)
    .order('start_time', { ascending: false });

  if (error) {
    console.error('Error fetching time entries:', error);
    return <div>Error loading time tracking data</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Time Tracking Dashboard</h1>
      <DateRangeFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Time Spent by Project</CardTitle>
          </CardHeader>
          <CardContent>
            <TimeSpentChart timeEntries={timeEntries || []} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Time Tracking Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <TimeTrackingSummary timeEntries={timeEntries || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
