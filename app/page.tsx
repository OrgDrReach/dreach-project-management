import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import AdminPasskeyModal from '@/components/auth/AdminPasskeyModal';

export default async function Home() {
	const supabase = createServerComponentClient({ cookies });
	const { data: { session } } = await supabase.auth.getSession();

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<main className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
				<h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
						Project Management
				</h1>
				<p className="text-center text-gray-600 mb-8">
					Manage your projects and employees efficiently.
				</p>
				{!session && (
					<div className="space-y-4">
						<Link
							href="/auth/signin"
							className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
							Sign In
						</Link>
						<Link
							href="/auth/signup"
							className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
							Sign Up
						</Link>
					</div>
				)}
				<div className="mt-6 text-center">
					<AdminPasskeyModal />
				</div>
			</main>
		</div>
	);
}
