import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AdminPasskeyModal from '@/components/auth/AdminPasskeyModal';

export default async function Home() {
	const supabase = createServerComponentClient({ cookies });
	const { data: { session } } = await supabase.auth.getSession();

	if (session) {
		// If the user is signed in, redirect to the dashboard
		redirect('/dashboard');
	}

	return (
		<div className="flex flex-col items-center h-auto">
			<main className="flex items-center justify-center flex-grow">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">
						Welcome to Project Management
					</h1>
					<p className="mb-4">Manage your projects and employees efficiently.</p>
					<div className={`flex flex-col md:flex-row gap-4 items-center justify-center`}>
						<Link
							href="/auth/signin"
							className="bg-blue-500 text-white px-4 py-2 rounded">
							Sign In
						</Link>
						<Link
							href="/auth/signup"
							className="bg-green-500 text-white px-4 py-2 rounded">
							Sign Up
						</Link>
					</div>
					<AdminPasskeyModal />
				</div>
			</main>
		</div>
	);
}
