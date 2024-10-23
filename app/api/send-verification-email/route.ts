import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { rateLimit } from '@/utils/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

// Create a transporter using your custom SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production'
  }
});

export async function POST(request: Request) {
  try {
    await limiter.check(5, 'SEND_EMAIL_RATE_LIMIT'); // 5 requests per minute
  } catch {
    console.log('Rate limit exceeded for email verification');
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      console.error('Missing email or OTP in request');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@dreachinsights.dreach.in',
      to: email,
      subject: 'Verify your email',
      text: `Your verification code is: ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Email Verification</h1>
          <p>Thank you for registering with Dr. Reach Insights. To complete your registration, please use the following verification code:</p>
          <h2 style="background-color: #f0f0f0; padding: 10px; text-align: center;">${otp}</h2>
          <p>If you didn't request this verification, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
