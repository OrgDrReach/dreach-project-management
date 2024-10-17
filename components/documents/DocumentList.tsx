import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Document {
  id: string;
  type: string;
  content: string;
  created_at: string;
  employees: {
    first_name: string;
    last_name: string;
  };
}

interface DocumentListProps {
  documents: Document[];
}

export default function DocumentList({ documents }: DocumentListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {documents.map((document) => (
        <Card key={document.id}>
          <CardHeader>
            <CardTitle>{document.type}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Employee: {document.employees.first_name} {document.employees.last_name}</p>
            <p>Created: {new Date(document.created_at).toLocaleDateString()}</p>
            <Button className="mt-2" onClick={() => window.open(`/api/documents/${document.id}`, '_blank')}>
              View Document
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}