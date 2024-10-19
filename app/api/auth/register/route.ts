import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = registerSchema.parse(body);

    // TODO: Implement actual registration logic
    // This is a mock implementation for demonstration purposes
    if (email === "test@example.com") {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // Simulate successful registration
    return NextResponse.json({ message: "Registration successful" }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
