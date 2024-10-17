"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function PayrollForm() {
  const [employeeId, setEmployeeId] = useState("");
  const [payPeriodStart, setPayPeriodStart] = useState("");
  const [payPeriodEnd, setPayPeriodEnd] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [deductions, setDeductions] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    const netPay = parseFloat(baseSalary) - parseFloat(deductions);
    const { data, error } = await supabase
      .from("payroll")
      .insert({
        employee_id: employeeId,
        pay_period_start: payPeriodStart,
        pay_period_end: payPeriodEnd,
        base_salary: parseFloat(baseSalary),
        deductions: parseFloat(deductions),
        net_pay: netPay,
        payment_date: paymentDate,
      });

    if (error) {
      console.error("Error creating payroll entry:", error);
    } else {
      // Reset form fields
      setEmployeeId("");
      setPayPeriodStart("");
      setPayPeriodEnd("");
      setBaseSalary("");
      setDeductions("");
      setPaymentDate("");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="employeeId">Employee ID</Label>
        <Input
          id="employeeId"
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="payPeriodStart">Pay Period Start</Label>
          <Input
            id="payPeriodStart"
            type="date"
            value={payPeriodStart}
            onChange={(e) => setPayPeriodStart(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="payPeriodEnd">Pay Period End</Label>
          <Input
            id="payPeriodEnd"
            type="date"
            value={payPeriodEnd}
            onChange={(e) => setPayPeriodEnd(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="baseSalary">Base Salary</Label>
        <Input
          id="baseSalary"
          type="number"
          value={baseSalary}
          onChange={(e) => setBaseSalary(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="deductions">Deductions</Label>
        <Input
          id="deductions"
          type="number"
          value={deductions}
          onChange={(e) => setDeductions(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="paymentDate">Payment Date</Label>
        <Input
          id="paymentDate"
          type="date"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Create Payroll Entry</Button>
    </form>
  );
}