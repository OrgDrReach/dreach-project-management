import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SignUpForm from '@/components/auth/SignUpForm';

export default async function SignUp() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUpForm />
    </div>
  );
}
