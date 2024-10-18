import { createClient } from "@/utils/supabase/server";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PayrollForm from "@/components/payroll/PayrollForm";
import { withRoleAccess } from "@/components/RBAC-role-control/WithRoleAccess";
async function PayrollPage() {
	const supabase = createClient();
	const { data: payrollEntries, error } = await supabase
		.from("payroll")
		.select("*, employees(first_name, last_name)")
		.order("payment_date", { ascending: false });

	if (error) {
		console.error("Error fetching payroll entries:", error);
		return <div>Error loading payroll entries</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Payroll Management</h1>
			<PayrollForm />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
				{payrollEntries.map((entry) => (
					<Card key={entry.id}>
						<CardHeader>
							<CardTitle>
								{entry.employees.first_name} {entry.employees.last_name}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								Pay Period:{" "}
								{new Date(entry.pay_period_start).toLocaleDateString()} -{" "}
								{new Date(entry.pay_period_end).toLocaleDateString()}
							</p>
							<p>Base Salary: ${entry.base_salary.toFixed(2)}</p>
							<p>Deductions: ${entry.deductions.toFixed(2)}</p>
							<p>Net Pay: ${entry.net_pay.toFixed(2)}</p>
							<p>
								Payment Date:{" "}
								{new Date(entry.payment_date).toLocaleDateString()}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}

export default withRoleAccess(PayrollPage, [
	"admin",
	"ceo",
	"coo",
	"cto",
	"cio",
	"cmo",
	"cfo",
	"hr",
]);
