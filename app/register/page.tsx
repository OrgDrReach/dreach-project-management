import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <main className="w-full max-w-md">
        <Image
          className="mx-auto mb-8"
          src="/favicon.ico"
          alt="Dr. Reach Insights logo"
          width={180}
          height={38}
          priority
        />
        <RegisterForm />
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            Sign in here
          </Link>
        </p>
      </main>
    </div>
  );
}
