"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { sendNotification } from "@/utils/notification/notifications";
import TimeEntryForm from "@/components/time/TimeEntryForm";
import TimeLogView from "@/components/time/TimeLogView";
import { Task } from "@/types/calendar";

interface TaskCardProps {
	task: Task;
	onUpdate: () => void;
}

export default function TaskCard({ task, onUpdate }: TaskCardProps) {
	const [status, setStatus] = useState(task.status);

	const handleStatusChange = async (newStatus: string) => {
		const supabase = createClient();
		const { error } = await supabase
			.from("tasks")
			.update({ status: newStatus })
			.eq("id", task.id);

		if (error) {
			console.error("Error updating task status:", error);
		} else {
			setStatus(newStatus);
			onUpdate();

			// Send notification to the task assignee
			if (task.assignee) {
				// Assuming there's a function to get the assignee's ID
				const assigneeId = await getAssigneeId(task.assignee);
				if (assigneeId) {
					await sendNotification(
						assigneeId,
						"Task Status Updated",
						`The status of task "${task.title}" has been updated to ${newStatus}`
					);
				}
			}
		}
	};

	const getStatusColor = (status: string | undefined) => {
		switch (status?.toLowerCase()) {
			case 'in progress':
				return 'bg-blue-500';
			case 'completed':
				return 'bg-green-500';
			case 'overdue':
				return 'bg-red-500';
			default:
				return 'bg-gray-500';
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>{task.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p>{task.description}</p>
				{task.assignee && (
					<p>
						Assignee: {task.assignee.first_name} {task.assignee.last_name}
					</p>
				)}
				{task.due_date && (
					<p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
				)}
				<div className="mt-2">
					<Select value={status} onValueChange={handleStatusChange}>
						<SelectTrigger>
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="To Do">To Do</SelectItem>
							<SelectItem value="In Progress">In Progress</SelectItem>
							<SelectItem value="Done">Done</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="mt-4">
					<h4 className="font-semibold mb-2">Log Time</h4>
					<TimeEntryForm taskId={task.id} onComplete={onUpdate} />
				</div>
				<div className="mt-4">
					<TimeLogView taskId={task.id} />
				</div>
			</CardContent>
		</Card>
	);
}

async function getAssigneeId(assignee: {
	first_name: string;
	last_name: string;
}): Promise<string | null> {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("users")
		.select("id")
		.match({ first_name: assignee.first_name, last_name: assignee.last_name })
		.single();

	if (error) {
		if (error.code === "PGRST116") {
			console.warn(
				`No user found for ${assignee.first_name} ${assignee.last_name}`
			);
			return null;
		}
		console.error("Error fetching assignee ID:", error);
		return null;
	}

	return data?.id ?? null;
}
