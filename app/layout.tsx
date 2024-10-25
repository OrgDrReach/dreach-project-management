import { ThemeProvider } from "@/components/themes/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dr. Reach Insights",
	description:
		"A comprehensive project management tool that combines Kanban-based task management, RBAC, and AI-powered insights to streamline your workflow and boost productivity.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
