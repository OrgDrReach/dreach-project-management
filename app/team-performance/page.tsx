import { createServerSideClient } from "@/utils/supabase/server";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TeamProductivityChart from "@/components/team/TeamProductivityChart";
import TaskCompletionRateChart from "@/components/team/TaskCompletionRateChart";
import { cookies } from 'next/headers';

export default async function TeamPerformancePage() {
  const cookieStore = cookies();
  const supabase = await createServerSideClient(cookieStore);

  // Fetch team performance data
  const { data: teamProductivity, error: productivityError } = await supabase.rpc('get_team_productivity');
  const { data: taskCompletionRates, error: completionRateError } = await supabase.rpc('get_task_completion_rates');

  if (productivityError || completionRateError) {
    console.error('Error fetching team performance data:', productivityError || completionRateError);
    return <div>Error loading team performance data</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Team Performance Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Team Productivity</CardTitle>
          </CardHeader>
          <CardContent>
            <TeamProductivityChart data={teamProductivity || []} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Task Completion Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskCompletionRateChart data={taskCompletionRates || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}