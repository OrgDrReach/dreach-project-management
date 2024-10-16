import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function EmployeePage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: employee, error } = await supabase
    .from("employees")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !employee) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{`${employee.first_name} ${employee.last_name}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Email: {employee.email}</p>
          <p>Position: {employee.position}</p>
          <p>Department: {employee.department}</p>
          <p>Hire Date: {new Date(employee.hire_date).toLocaleDateString()}</p>
          <p>Salary: ${employee.salary.toFixed(2)}</p>
          <p>Status: {employee.status}</p>
        </CardContent>
      </Card>
    </div>
  );
}