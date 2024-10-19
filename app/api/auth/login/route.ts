import { NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // TODO: Implement actual authentication logic
    // This is a mock implementation for demonstration purposes
    if (email === "admin@example.com" && password === "admin123") {
      return NextResponse.json({ role: "admin" }, { status: 200 });
    } else if (email === "user@example.com" && password === "user123") {
      return NextResponse.json({ role: "user" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
