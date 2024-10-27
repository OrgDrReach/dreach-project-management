'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function generateOTP(): Promise<string> {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOTP(email: string) {
  const otp = await generateOTP();
  const cookieStore = await cookies(); // Await the cookies() call

  // Store OTP in a cookie (you might want to use a more secure method in production)
  cookieStore.set('verificationOTP', otp, { maxAge: 600, path: '/' });
  cookieStore.set('verificationEmail', email, { maxAge: 600, path: '/' });

  // Send OTP via email
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Your OTP for Dr. Reach Insights',
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    });
  } catch (error) {
    console.error('Failed to send OTP email:', error);
    return { error: 'Failed to send OTP email. Please try again.' };
  }

  return { success: true };
}

export async function verifyOTP(formData: FormData) {
  const enteredOTP = formData.get('otp') as string;
  const cookieStore = await cookies();
  const storedOTP = cookieStore.get('verificationOTP')?.value;
  const email = cookieStore.get('verificationEmail')?.value;

  if (!storedOTP || !email) {
    return { error: 'OTP expired or email not found. Please sign up again.' };
  }

  if (enteredOTP !== storedOTP) {
    return { error: 'Invalid OTP. Please try again.' };
  }

  const supabase = createClient();

  // Update user's email_confirmed_at to confirm the account
  const { data: userData, error: updateError } = await supabase.auth.updateUser({
    data: { email_confirmed_at: new Date().toISOString() }
  });

  if (updateError) {
    console.error('Error updating user in Supabase Auth:', updateError);
    return { error: `Error confirming user: ${updateError.message}` };
  }

  if (!userData.user) {
    console.error('User data not found after update');
    return { error: 'User data not found after confirmation. Please try logging in.' };
  }

  // Also update the custom users table if you have one
  const { error: dbError } = await supabase
    .from('users')
    .update({ email_confirmed_at: new Date().toISOString() })
    .eq('email', email);

  if (dbError) {
    console.error('Error updating user in database:', dbError);
    // Don't return an error here, as the auth update was successful
    console.warn('Failed to update custom users table, but auth update was successful');
  }

  // Clear the verification cookies
  cookieStore.set('verificationOTP', '', { maxAge: 0, path: '/' });
  cookieStore.set('verificationEmail', '', { maxAge: 0, path: '/' });

  // Sign in the user after successful verification
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: email,
    password: cookieStore.get('tempPassword')?.value || '',
  });

  if (signInError) {
    console.error('Error signing in after verification:', signInError);
    return { error: 'Account confirmed, but failed to sign in. Please try logging in manually.' };
  }

  // Redirect to dashboard
  redirect('/dashboard');
}
