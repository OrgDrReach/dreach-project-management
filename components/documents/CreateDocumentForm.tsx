"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function CreateDocumentForm() {
  const [employeeId, setEmployeeId] = useState("");
  const [documentType, setDocumentType] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    const { data, error } = await supabase
      .from("documents")
      .insert({
        employee_id: employeeId,
        type: documentType,
        content: "Generated document content", // This would be replaced with actual document generation logic
      });

    if (error) {
      console.error("Error creating document:", error);
    } else {
      setEmployeeId("");
      setDocumentType("");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="employeeId">Employee ID</Label>
        <Input
          id="employeeId"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="documentType">Document Type</Label>
        <Select onValueChange={setDocumentType} required>
          <SelectTrigger>
            <SelectValue placeholder="Select document type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="offer_letter">Offer Letter</SelectItem>
            <SelectItem value="employee_id">Employee ID</SelectItem>
            <SelectItem value="certificate">Certificate</SelectItem>
            <SelectItem value="recommendation_letter">Letter of Recommendation</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Generate Document</Button>
    </form>
  );
}