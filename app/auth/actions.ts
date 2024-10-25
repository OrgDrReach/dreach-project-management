'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { sendOTP, verifyOTP } from './otp/action'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  const supabase = createClient()

  // Sign up the user without email confirmation
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name,
      },
      // Remove emailRedirectTo option completely to disable email confirmation
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
