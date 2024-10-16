import Link from "next/link";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";

interface Project {
	id: string;
	name: string;
	description: string;
	status: string;
}

interface ProjectListProps {
	projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{projects.map((project) => (
				<Link href={`/projects/${project.id}`} key={project.id}>
					<Card className="hover:shadow-md transition-shadow">
						<CardHeader>
							<CardTitle>{project.name}</CardTitle>
							<CardDescription>{project.description}</CardDescription>
							<div className="text-sm text-muted-foreground mt-2">
								Status: {project.status}
							</div>
						</CardHeader>
					</Card>
				</Link>
			))}
		</div>
	);
}
