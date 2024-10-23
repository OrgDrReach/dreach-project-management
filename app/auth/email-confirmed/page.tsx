import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EmailConfirmed() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Email Confirmed</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Thank you for confirming your email. Your account is now fully activated.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You can close this tab or return to the login page.
          </p>
          <Button asChild>
            <Link href="/auth/login">Go to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
