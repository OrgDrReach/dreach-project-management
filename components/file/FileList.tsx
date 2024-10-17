"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { FileObject } from "@supabase/storage-js";

interface FileListProps {
  projectId: string;
}

export default function FileList({ projectId }: FileListProps) {
  const [files, setFiles] = useState<FileObject[]>([]);
  const supabase = createClient();

  const fetchFiles = useCallback(async () => {
    const { data, error } = await supabase.storage
      .from("project-files")
      .list(`project-files/${projectId}`);

    if (error) {
      console.error("Error fetching files:", error);
    } else {
      setFiles(data || []);
    }
  }, [supabase, projectId]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleDownload = async (fileName: string) => {
    const { data, error } = await supabase.storage
      .from("project-files")
      .download(`project-files/${projectId}/${fileName}`);

    if (error) {
      console.error("Error downloading file:", error);
    } else {
      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Project Files</h3>
      {files.map((file) => (
        <div key={file.name} className="flex justify-between items-center">
          <span>{file.name}</span>
          <Button onClick={() => handleDownload(file.name)}>Download</Button>
        </div>
      ))}
    </div>
  );
}
