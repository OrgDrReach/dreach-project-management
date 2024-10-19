import { createClient } from "@/utils/supabase/server";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import UserSettingsForm from "@/components/settings/UserSettingsForm";

export default async function SettingsPage() {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>Please log in to access settings.</div>;
  }

  const { data: userSettings, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error && error.code !== 'PGSQL_NO_ROWS_RETURNED') {
    console.error('Error fetching user settings:', error);
    return <div>Error loading user settings</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Time Tracking Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <UserSettingsForm initialSettings={userSettings || {}} userId={user.id} />
        </CardContent>
      </Card>
    </div>
  );
}