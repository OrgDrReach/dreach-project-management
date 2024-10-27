'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { sendOTP, verifyOTP } from './otp/action'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const supabase = createClient()

  // Attempt to sign in
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError) {
    return { error: signInError.message }
  }

  if (!signInData.user) {
    return { error: 'User not found' }
  }

  // Fetch additional user data from the database
  const { data: userData, error: userDataError } = await supabase
    .from('users')
    .select('*')
    .eq('id', signInData.user.id)
    .single()

  if (userDataError) {
    return { error: 'Error fetching user data' }
  }

  // Check if the user's email is confirmed
  if (!signInData.user.email_confirmed_at) {
    // Send OTP for email verification
    const otpResult = await sendOTP(email)
    if (otpResult.error) {
      return { error: otpResult.error }
    }
    // Redirect to OTP verification page
    redirect('/auth/verify-otp')
  }

  // Update the session with additional user data
  const { error: updateSessionError } = await supabase.auth.updateUser({
    data: {
      ...userData,
      full_name: userData.full_name || signInData.user.user_metadata.full_name,
    },
  })

  if (updateSessionError) {
    return { error: 'Error updating user session' }
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

  const cookieStore = await cookies();
  cookieStore.set('tempPassword', password, { maxAge: 600, path: '/', httpOnly: true, secure: true });

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
