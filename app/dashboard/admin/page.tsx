import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    // TODO: Implement actual role checking logic
    const checkUserRole = async () => {
      const response = await fetch("/api/auth/check-role");
      if (response.ok) {
        const { role } = await response.json();
        if (role !== "admin") {
          router.push("/");
        }
      } else {
        router.push("/");
      }
    };

    checkUserRole();
  }, [router]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {/* Add admin dashboard content here */}
    </div>
  );
}
