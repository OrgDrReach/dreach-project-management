import { createServerClient, SupabaseClient } from "@supabase/ssr";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const createServerSideClient = async (): Promise<SupabaseClient> => {
  const { cookies } = await import("next/headers");
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set(name, value, options);
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set(name, "", { ...options, maxAge: 0 });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};

export const createClientSideClient = (): SupabaseClient => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookies = document.cookie.split('; ');
          const cookie = cookies.find(c => c.startsWith(name + '='));
          return cookie ? cookie.split('=')[1] : undefined;
        },
        set(name: string, value: string, options: any) {
          document.cookie = `${name}=${value}; ${Object.entries(options).map(([k, v]) => `${k}=${v}`).join('; ')}`;
        },
        remove(name: string, options: any) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ${Object.entries(options).map(([k, v]) => `${k}=${v}`).join('; ')}`;
        },
      },
    }
  );
};

export const createClient = typeof window === "undefined" ? createServerSideClient : createClientSideClient;
