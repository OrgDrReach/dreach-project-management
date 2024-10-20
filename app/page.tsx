import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation/Navigation";
import { Button } from "@/components/ui/button";
import {
	Trello,
	Shield,
	Brain,
	BarChart,
	Users,
	Calendar,
	Zap,
	GitBranch,
	FileText,
	MessageSquare,
	Briefcase,
	Award,
	LineChart,
	Lock,
	Cloud,
	Plug,
	UserPlus,
	FileBarChart,
	ShieldCheck,
} from "lucide-react";

export default function LandingPage() {
	const features = [
		{
			name: "Kanban Board",
			description:
				"Visualize your workflow with customizable Kanban boards for efficient task management.",
			icon: Trello,
		},
		{
			name: "RBAC Security",
			description:
				"Ensure data security with Role-Based Access Control for granular permissions management.",
			icon: Shield,
		},
		{
			name: "AI-Powered Insights",
			description:
				"Leverage artificial intelligence for predictive analytics and automated task assignment.",
			icon: Brain,
		},
		{
			name: "Comprehensive Reporting",
			description:
				"Generate detailed reports on project progress, employee performance, and organizational insights.",
			icon: BarChart,
		},
		{
			name: "Employee Management",
			description:
				"Streamline HR processes with employee database management and automated onboarding.",
			icon: Users,
		},
		{
			name: "Project Planning",
			description:
				"Plan projects with Gantt charts, resource allocation, and agile sprint planning.",
			icon: Calendar,
		},
		{
			name: "Automation & Integration",
			description:
				"Automate workflows and integrate with popular tools to enhance productivity.",
			icon: Zap,
		},
		{
			name: "DevOps Integration",
			description:
				"Seamlessly integrate with DevOps tools for continuous integration and delivery.",
			icon: GitBranch,
		},
		{
			name: "Document Management",
			description:
				"Centralize and organize all project-related documents and files.",
			icon: FileText,
		},
		{
			name: "Team Collaboration",
			description:
				"Foster team communication with real-time commenting and @mentioning features.",
			icon: MessageSquare,
		},
		{
			name: "Client Management",
			description:
				"Manage client relationships with a secure portal for updates and file sharing.",
			icon: Briefcase,
		},
		{
			name: "Performance Recognition",
			description:
				"Recognize and reward top performers with integrated certificate generation.",
			icon: Award,
		},
		{
			name: "Organization Insights",
			description:
				"Gain valuable insights into organizational performance with customizable dashboards.",
			icon: LineChart,
		},
		{
			name: "Data Encryption",
			description:
				"Ensure data security with end-to-end encryption and automated backups.",
			icon: Lock,
		},
		{
			name: "Cloud Integration",
			description:
				"Seamlessly integrate with cloud storage providers for scalable data management.",
			icon: Cloud,
		},
		{
			name: "API & Marketplace",
			description:
				"Extend functionality with our API and marketplace for third-party integrations.",
			icon: Plug,
		},
	];

	const orgManagementFeatures = [
		{
			name: "Employee Database",
			description:
				"Maintain a comprehensive employee database with customizable fields and filters.",
			icon: Users,
		},
		{
			name: "Automated Onboarding",
			description:
				"Streamline the onboarding process with automated workflows and task assignments.",
			icon: UserPlus,
		},
		{
			name: "Performance Tracking",
			description:
				"Monitor employee performance with customizable KPIs and metrics.",
			icon: FileBarChart,
		},
		{
			name: "Certificate Generation",
			description:
				"Automatically generate certificates and awards for employee recognition.",
			icon: ShieldCheck,
		},
	];

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<Navigation />
			<main className="pt-16">
				{/* Hero Section */}
				<section className="relative bg-white dark:bg-gray-800 overflow-hidden">
					<div className="max-w-7xl mx-auto">
						<div className="relative z-10 pb-8 bg-white dark:bg-gray-800 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
							<svg
								className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white dark:text-gray-800 transform translate-x-1/2"
								fill="currentColor"
								viewBox="0 0 100 100"
								preserveAspectRatio="none"
								aria-hidden="true">
								<polygon points="50,0 100,0 50,100 0,100" />
							</svg>
							<div className="relative px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32">
								<div className="text-left">
									<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
										<span className="block xl:inline">Revolutionize Your</span>{" "}
										<span className="block text-indigo-600 xl:inline">
											Project Management
										</span>
									</h1>
									<p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
										Dr. Reach Insights is a comprehensive project management
										tool that combines Kanban-based task management, RBAC, and
										AI-powered insights to streamline your workflow and boost
										productivity.
									</p>
									<div className="mt-5 sm:mt-8 sm:flex sm:justify-start">
										<div className="rounded-md shadow">
											<Button asChild size="lg">
												<Link href="/auth/sign-in">Get Started</Link>
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
						<Image
							className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
							src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
							alt="Project Management"
							width={2070}
							height={1380}
						/>
					</div>
				</section>

				{/* Features Section */}
				<section className="py-12 bg-gray-100 dark:bg-gray-700">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="lg:text-center">
							<h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
								Features
							</h2>
							<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
								A comprehensive solution for project management
							</p>
							<p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
								Dr. Reach Insights offers a suite of powerful features to
								enhance your project management and organizational operations.
							</p>
						</div>

						<div className="mt-10">
							<dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-x-8 md:gap-y-10">
								{features.map((feature) => (
									<div key={feature.name} className="relative">
										<dt>
											<div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
												<feature.icon className="h-6 w-6" aria-hidden="true" />
											</div>
											<p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
												{feature.name}
											</p>
										</dt>
										<dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
											{feature.description}
										</dd>
									</div>
								))}
							</dl>
						</div>
					</div>
				</section>

				{/* Organization Management Section */}
				<section className="py-12 bg-white dark:bg-gray-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="lg:text-center">
							<h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
								Organization Management
							</h2>
							<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
								Empower Your Organization
							</p>
							<p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
								Dr. Reach Insights provides powerful tools to manage your
								organization efficiently, from employee onboarding to
								performance tracking.
							</p>
						</div>

						<div className="mt-10">
							<dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-x-8 md:gap-y-10">
								{orgManagementFeatures.map((feature) => (
									<div key={feature.name} className="relative">
										<dt>
											<div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
												<feature.icon className="h-6 w-6" aria-hidden="true" />
											</div>
											<p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
												{feature.name}
											</p>
										</dt>
										<dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
											{feature.description}
										</dd>
									</div>
								))}
							</dl>
						</div>

						<div className="mt-10 prose prose-indigo dark:prose-invert mx-auto">
							<h3>How It Works</h3>
							<p>
								The Organization Management module in Dr. Reach Insights
								operates as a central hub for all your HR and employee
								management needs. It seamlessly integrates with the project
								management features, allowing you to:
							</p>
							<ul>
								<li>Manage employee data and generate unique Employee IDs</li>
								<li>
									Monitor organization and employee performance with
									customizable charts and metrics
								</li>
								<li>
									Automate the employee onboarding and offboarding processes
								</li>
								<li>
									Generate insightful reports on organizational performance
								</li>
								<li>
									Create and manage offer letters, certificates, and letters of
									recommendation
								</li>
								<li>
									Track employee performance through integrated workflow charts
								</li>
							</ul>
							<p>
								By centralizing these functions, Dr. Reach Insights enables your
								organization to operate more efficiently, make data-driven
								decisions, and foster a culture of recognition and continuous
								improvement.
							</p>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
