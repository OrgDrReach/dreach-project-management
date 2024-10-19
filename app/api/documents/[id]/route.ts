import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies();
  const supabase = createClient({ cookies: () => cookieStore });
  const { data: document, error } = await supabase
    .from("documents")
    .select("*, employees(first_name, last_name)")
    .eq("id", params.id)
    .single();

  if (error || !document) {
    return new NextResponse("Document not found", { status: 404 });
  }

  // Here you would generate the actual document content based on the type and employee data
  const content = `This is a ${document.type} for ${document.employees.first_name} ${document.employees.last_name}.\n\n${document.content}`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": `attachment; filename="${document.type}_${document.employees.last_name}.txt"`,
    },
  });
}
