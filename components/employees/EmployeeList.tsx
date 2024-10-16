import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  position: string;
  department: string;
}

interface EmployeeListProps {
  employees: Employee[];
}

export default function EmployeeList({ employees }: EmployeeListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.map((employee) => (
        <Link href={`/employees/${employee.id}`} key={employee.id}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{`${employee.first_name} ${employee.last_name}`}</CardTitle>
              <CardDescription>{employee.position}</CardDescription>
              <div className="text-sm text-muted-foreground mt-2">
                Department: {employee.department}
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}