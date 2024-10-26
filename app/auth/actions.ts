'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { sendOTP, verifyOTP } from './otp/action'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = createClient()

  // Attempt to sign in
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  if (!data.user) {
    return { error: 'User not found' }
  }

  // Check if the user's email is confirmed
  if (!data.user.email_confirmed_at) {
    return { error: 'Please confirm your email before logging in' }
  }

  // If login is successful and email is confirmed, redirect to dashboard
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  const supabase = createClient()

  // Sign up the user with email confirmation disabled and include the name in user metadata
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name, // Store the user's name in the user metadata
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  // Send OTP
  const otpResult = await sendOTP(email);
  if (otpResult.error) {
    return { error: otpResult.error };
  }

  // Redirect to OTP verification page
  redirect('/auth/verify-otp')
}

export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: error.message }
  }

  redirect('/auth/login')
}

export { verifyOTP };
