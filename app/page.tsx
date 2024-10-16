import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default function Home() {
	return (
		<div className="flex flex-col items-center h-auto">

			<main className="flex items-center justify-center flex-grow">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">
						Welcome to Project Management
					</h1>
					<p className="mb-4">Manage your projects and employees efficiently.</p>
					<div className={`flex flex-col md:flex-row gap-4 items-center justify-center`}>
						<a
							href="/projects"
							className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
							View Projects
						</a>
						<a
							href="/employees"
							className="bg-green-500 text-white px-4 py-2 rounded">
							View Employees
						</a>
					</div>
				</div>
			</main>
		</div>
	);
}
