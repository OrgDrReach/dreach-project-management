import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

export function Navigation() {
  return (
    <nav className="fixed w-full bg-white dark:bg-gray-900 shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              Dr. Reach
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button asChild>
              <Link href="/auth/sign-in">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
