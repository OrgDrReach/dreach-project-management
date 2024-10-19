import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

export const createServerSideClient = (cookieStore: any): SupabaseClient => {
	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					try {
						cookieStore.set({ name, value, ...options });
					} catch (error) {
						// The `set` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
				remove(name: string, options: CookieOptions) {
					try {
						cookieStore.set({ name, value: "", ...options, maxAge: 0 });
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
					const cookies = document.cookie.split("; ");
					const cookie = cookies.find((c) => c.startsWith(name + "="));
					return cookie ? cookie.split("=")[1] : undefined;
				},
				set(name: string, value: string, options: CookieOptions) {
					document.cookie = `${name}=${value}; ${Object.entries(options)
						.map(([k, v]) => `${k}=${v}`)
						.join("; ")}`;
				},
				remove(name: string, options: CookieOptions) {
					document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ${Object.entries(
						options
						)
						.map(([k, v]) => `${k}=${v}`)
						.join("; ")}`;
				},
			},
		}
	);
};

export const createClient =
	typeof window === "undefined"
		? createServerSideClient
		: createClientSideClient;
