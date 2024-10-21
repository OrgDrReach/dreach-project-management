import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";
import { ThemeToggle } from "@/components/themes/theme-toggle";

export default function Register() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-900">
			<main className="w-full max-w-md">
				<div className="flex justify-end mb-4">
					<ThemeToggle />
				</div>
				<Image
					className="mx-auto mb-8"
					src="/favicon.ico"
					alt="Dr. Reach Insights logo"
					width={180}
					height={38}
					priority
				/>
				<RegisterForm />
				<p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
					Already have an account?{" "}
					<Link
						href="/auth/sign-in"
						className="text-blue-600 hover:underline dark:text-blue-400">
						Sign in here
					</Link>
				</p>
			</main>
		</div>
	);
}
