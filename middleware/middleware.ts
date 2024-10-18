import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile) {
      // Add the user's role to the request headers
      res.headers.set('x-user-role', profile.role);
    }
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/projects/:path*', '/employees/:path*', '/payroll/:path*'],
};