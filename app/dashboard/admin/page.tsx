"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/themes/theme-toggle";

export default function AdminDashboard() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkUserRole = async () => {
			try {
				const response = await fetch("/api/auth/check-role");
				if (response.ok) {
					const { role } = await response.json();
					if (role !== "admin") {
						router.push("/");
					}
				} else {
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

	return (
		<div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
			<div className="flex justify-end mb-4">
				<ThemeToggle />
			</div>
			<h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
				Admin Dashboard
			</h1>
			<p className="text-gray-700 dark:text-gray-300">
				Welcome to the admin dashboard. Here you can manage users, projects, and
				organization settings.
			</p>
			{/* Add admin dashboard content here */}
		</div>
	);
}
