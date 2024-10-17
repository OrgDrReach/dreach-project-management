"use client";

import { useState } from "react";
import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">{isSignIn ? "Sign In" : "Sign Up"}</h1>
      {isSignIn ? <SignIn /> : <SignUp />}
      <div className="mt-4">
        <Button variant="link" onClick={() => setIsSignIn(!isSignIn)}>
          {isSignIn ? "Need an account? Sign Up" : "Already have an account? Sign In"}
        </Button>
      </div>
    </div>
  );
}