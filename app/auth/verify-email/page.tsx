"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerifyEmail() {
  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-gray-600 dark:text-gray-300">
          We've sent a verification link to your email address. Please check your inbox and click on the link to verify your account.
        </p>
      </CardContent>
    </Card>
  );
}
