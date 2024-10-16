import React from 'react';
import { createClient } from "@/utils/supabase/server";
import ProjectList from "@/components/projects/ProjectList";
import CreateProjectForm from '@/components/projects/CreateProjectForm';


export default async function ProjectsPage() {
  const supabase = createClient();
  const { data: projects, error } = await supabase.from("projects").select("*");

  if (error) {
    console.error("Error fetching projects:", error);
    return <div>Error loading projects</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <CreateProjectForm />
      <ProjectList projects={projects} />
    </div>
  );
}
