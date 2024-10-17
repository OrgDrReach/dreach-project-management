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

interface TaskCardProps {
	task: {
		id: string;
		title: string;
		description: string;
		status: string;
		assignee: { first_name: string; last_name: string } | null;
		due_date: string | null;
	};
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
			if (task.assignee_id) {
				await sendNotification(
					task.assignee_id,
					"Task Status Updated",
					`The status of task "${task.title}" has been updated to ${newStatus}`
				);
			}
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
			</CardContent>
		</Card>
	);
}
