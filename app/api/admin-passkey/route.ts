import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { passkey } = await request.json();
  const adminPasskey = process.env.ADMIN_PASSKEY;

  if (passkey === adminPasskey) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
