import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import TaskCompletionChart from "@/components/tasks/TaskCompletionChart";
import ProjectProgressChart from "@/components/projects/ProjectProgressChart";
import UpcomingDeadlines, { Deadline } from "@/components/tasks/UpcomingDeadlines";

export default async function DashboardPage() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { data: projectCount } = await supabase
		.from("projects")
		.select("*", { count: "exact", head: true });

	const { data: employeeCount } = await supabase
		.from("employees")
		.select("*", { count: "exact", head: true });

	const { data: recentProjects } = await supabase
		.from("projects")
		.select("*")
		.order("created_at", { ascending: false })
		.limit(5);

	// Fetch task completion data
	const { data: taskCompletionData } = await supabase.rpc(
		"get_task_completion_stats"
	);

	// Fetch project progress data
	const { data: projectProgressData } = await supabase.rpc(
		"get_project_progress_stats"
	);

	// Fetch upcoming deadlines
	const { data: upcomingDeadlines } = await supabase
		.from("tasks")
		.select("id, title, due_date, project_id, projects(name)")
		.gte("due_date", new Date().toISOString())
		.order("due_date", { ascending: true })
		.limit(5);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
				<Card>
					<CardHeader>
						<CardTitle>Total Projects</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-4xl font-bold">{projectCount}</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Total Employees</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-4xl font-bold">{employeeCount}</p>
					</CardContent>
				</Card>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
				<Card>
					<CardHeader>
						<CardTitle>Task Completion Rate</CardTitle>
					</CardHeader>
					<CardContent>
						<TaskCompletionChart data={taskCompletionData || []} />
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Project Progress</CardTitle>
					</CardHeader>
					<CardContent>
						<ProjectProgressChart data={projectProgressData || []} />
					</CardContent>
				</Card>
			</div>
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Upcoming Deadlines</CardTitle>
				</CardHeader>
				<CardContent>
					<UpcomingDeadlines deadlines={upcomingDeadlines?.map(deadline => ({
						...deadline,
						projects: { name: deadline.projects[0]?.name || '' }
					})) || []} />
				</CardContent>
			</Card>
			<h2 className="text-xl font-bold mb-4">Recent Projects</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{recentProjects?.map((project) => (
					<Link href={`/projects/${project.id}`} key={project.id}>
						<Card className="hover:shadow-md transition-shadow">
							<CardHeader>
								<CardTitle>{project.name}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									{project.description}
								</p>
								<p className="mt-2">Status: {project.status}</p>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}
