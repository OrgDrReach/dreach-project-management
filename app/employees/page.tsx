import { createClient } from "@/utils/supabase/server";
import EmployeeList from "@/components/employees/EmployeeList";
import CreateEmployeeForm from "@/components/employees/CreateEmployeeForm";

export default async function EmployeesPage() {
  const supabase = createClient();
  const { data: employees, error } = await supabase.from("employees").select("*");

  if (error) {
    console.error("Error fetching employees:", error);
    return <div>Error loading employees</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <CreateEmployeeForm />
      <EmployeeList employees={employees} />
    </div>
  );
}