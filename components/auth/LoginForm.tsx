"use client";

import dynamic from 'next/dynamic'
import { Suspense } from 'react';
import { Loader2 } from "lucide-react";

const LoginFormContent = dynamic(() => import('./LoginFormContent'), { 
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-screen">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
})

export default function LoginForm() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>}>
      <LoginFormContent />
    </Suspense>
  )
}
