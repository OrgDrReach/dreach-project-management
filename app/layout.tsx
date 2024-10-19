import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import SupabaseLogo from "@/components/supabase-logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import SignOutButton from '@/components/auth/SignOutButton';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Project Management App',
  description: 'A comprehensive project and employee management system',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="w-full border-b border-b-foreground/10 py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">
                Dr. Reach Project Management
              </Link>
              <div className="flex items-center space-x-4">
                {session ? (
                  <>
                    <Link href="/dashboard">Dashboard</Link>
                    <Link href="/projects">Projects</Link>
                    <Link href="/employees">Employees</Link>
                    <Link href="/payroll">Payroll</Link>
                    <Link href="/documents">Documents</Link>
                    <Link href="/meetings">Meetings</Link>
                    <Link href="/calendar">Calendar</Link>
                    <Link href="/chat">Chat</Link>
                    <Link href="/time-tracking">Time Tracking</Link>
                    <Link href="/team-performance">Team Performance</Link>
                    <Link href="/settings">Settings</Link>
                    <SignOutButton />
                  </>
                ) : (
                  <>
                    <Link href="/auth/signin">Sign In</Link>
                    <Link href="/auth/signup">Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          </nav>

          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>

          <footer className="w-full border-t py-4 text-center text-sm">
            <div className="container mx-auto px-4">
              <p className="mb-2">
                ©️ 2024 All rights reserved | Dr. Reach - Healthunity Solutions Pvt. Ltd.
              </p>
              <div className="flex justify-center items-center space-x-4">
                <p className="flex items-center">
                  Powered by{" "}
                  <a
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-1"
                  >
                    <SupabaseLogo width="120" height="20" />
                  </a>
                </p>
                <ThemeSwitcher />
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
