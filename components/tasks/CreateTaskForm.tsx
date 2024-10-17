"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { sendNotification } from "@/utils/notification/notifications";

export default function CreateTaskForm({ projectId }: { projectId: string }) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [assigneeId, setAssigneeId] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [employees, setEmployees] = useState([]);
	const router = useRouter();

	useEffect(() => {
		const fetchEmployees = async () => {
			const supabase = createClient();
			const { data, error } = await supabase
				.from("employees")
				.select("id, first_name, last_name");
			if (error) {
				console.error("Error fetching employees:", error);
			} else {
				setEmployees(data);
			}
		};
		fetchEmployees();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const supabase = createClient();
		const { data, error } = await supabase.from("tasks").insert({
			project_id: projectId,
			title,
			description,
			status: "To Do",
			assignee_id: assigneeId,
			due_date: dueDate,
		});

		if (error) {
			console.error("Error creating task:", error);
		} else {
			setTitle("");
			setDescription("");
			setAssigneeId("");
			setDueDate("");
			router.refresh();

			// Send notification to the assigned user
			if (assigneeId) {
				await sendNotification(
					assigneeId,
					"New Task Assigned",
					`You have been assigned a new task: ${title}`
				);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 mb-8">
			<div>
				<Label htmlFor="title">Task Title</Label>
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
				<Label htmlFor="assignee">Assignee</Label>
				<Select onValueChange={setAssigneeId}>
					<SelectTrigger>
						<SelectValue placeholder="Select assignee" />
					</SelectTrigger>
					<SelectContent>
						{employees.map((employee) => (
							<SelectItem key={employee.id} value={employee.id}>
								{`${employee.first_name} ${employee.last_name}`}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div>
				<Label htmlFor="dueDate">Due Date</Label>
				<Input
					id="dueDate"
					type="date"
					value={dueDate}
					onChange={(e) => setDueDate(e.target.value)}
				/>
			</div>
			<Button type="submit">Create Task</Button>
		</form>
	);
}
