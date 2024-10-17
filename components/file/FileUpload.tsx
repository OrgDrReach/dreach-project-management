"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileUploadProps {
  projectId: string;
  onUploadComplete: () => void;
}

export default function FileUpload({ projectId, onUploadComplete }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const supabase = createClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `project-files/${projectId}/${fileName}`;

    const { error } = await supabase.storage
      .from("project-files")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading file:", error);
    } else {
      setFile(null);
      onUploadComplete();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="file">Upload File</Label>
        <Input
          id="file"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>
      <Button onClick={handleUpload} disabled={!file}>
        Upload
      </Button>
    </div>
  );
}