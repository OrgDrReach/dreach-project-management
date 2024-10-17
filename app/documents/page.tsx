import { createClient } from "@/utils/supabase/server";
import DocumentList from "@/components/documents/DocumentList";
import CreateDocumentForm from "@/components/documents/CreateDocumentForm";

export default async function DocumentsPage() {
  const supabase = createClient();
  const { data: documents, error } = await supabase
    .from("documents")
    .select("*, employees(first_name, last_name)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching documents:", error);
    return <div>Error loading documents</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Document Management</h1>
      <CreateDocumentForm />
      <DocumentList documents={documents} />
    </div>
  );
}