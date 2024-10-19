import { createServerSideClient } from "@/utils/supabase/server";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import UserSettingsForm from "@/components/settings/UserSettingsForm";
import { cookies } from 'next/headers';

export default async function SettingsPage() {
  const cookieStore = cookies();
  const supabase = await createServerSideClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>Please log in to access settings.</div>;
  }

  // Fetch user settings or other data as needed

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Time Tracking Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <UserSettingsForm user={user} />
        </CardContent>
      </Card>
    </div>
  );
}
