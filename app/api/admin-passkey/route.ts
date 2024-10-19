import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { passkey } = await request.json();
    const adminPasskey = process.env.ADMIN_PASSKEY;

    if (!adminPasskey) {
      console.error('ADMIN_PASSKEY is not set in the environment variables');
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 });
    }

    if (passkey === adminPasskey) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid passkey' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error in admin-passkey route:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
