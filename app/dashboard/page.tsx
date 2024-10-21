"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/themes/theme-toggle";

export default function Dashboard() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [userRole, setUserRole] = useState<string | null>(null);

	useEffect(() => {
		const checkUserRole = async () => {
			try {
				const response = await fetch("/api/auth/check-role");
				if (response.ok) {
					const { role } = await response.json();
					setUserRole(role);
					if (role === "admin") {
						router.push("/dashboard/admin");
					}
				} else {
					// If the role check fails, redirect to the login page
					router.push("/");
				}
			} catch (error) {
				console.error("Error checking user role:", error);
				router.push("/");
			} finally {
				setIsLoading(false);
			}
		};

		checkUserRole();
	}, [router]);

	if (isLoading) {
		return <div className="p-8">Loading...</div>;
	}

	if (userRole !== "user") {
		return null; // This will prevent any flash of content before redirecting
	}

	return (
		<div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
			<div className="flex justify-end mb-4">
				<ThemeToggle />
			</div>
			<h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
				User Dashboard
			</h1>
			<p className="text-gray-700 dark:text-gray-300">
				Welcome to your dashboard. Here you can manage your projects and tasks.
			</p>
			{/* Add more dashboard content here */}
		</div>
	);
}
