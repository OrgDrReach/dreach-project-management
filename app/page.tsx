import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '@/components/navigation/Navigation';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative bg-white dark:bg-gray-800 overflow-hidden pt-16">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white dark:bg-gray-800 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white dark:text-gray-800 transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <polygon points="50,0 100,0 50,100 0,100" />
              </svg>
              <div className="relative px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32">
                <div className="text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Revolutionize Your</span>{' '}
                    <span className="block text-indigo-600 xl:inline">Project Management</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Dr. Reach Insights is a comprehensive project management tool that combines Kanban-based task management, RBAC, and AI-powered insights to streamline your workflow and boost productivity.
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
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                A better way to manage projects
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
                Dr. Reach Insights offers a suite of powerful features to enhance your project management experience.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {[
                  {
                    name: 'Kanban Board',
                    description: 'Visualize your workflow with customizable Kanban boards for efficient task management.',
                  },
                  {
                    name: 'RBAC Security',
                    description: 'Ensure data security with Role-Based Access Control for granular permissions management.',
                  },
                  {
                    name: 'AI-Powered Insights',
                    description: 'Leverage artificial intelligence for predictive analytics and automated task assignment.',
                  },
                  {
                    name: 'Comprehensive Reporting',
                    description: 'Generate detailed reports on project progress, employee performance, and organizational insights.',
                  },
                ].map((feature) => (
                  <div key={feature.name} className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        {/* You can add icons here if desired */}
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">{feature.name}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
