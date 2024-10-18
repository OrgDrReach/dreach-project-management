import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { ComponentType } from 'react';

export function withRoleAccess<P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: string[]
) {
  return function WithRoleAccess(props: P) {
    const [userRole, setUserRole] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
      async function checkUserRole() {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

          if (profile) {
            setUserRole(profile.role);
          }
        }
      }

      checkUserRole();
    }, [supabase]);

    if (!userRole) {
      return <div>Loading...</div>;
    }

    if (!allowedRoles.includes(userRole)) {
      router.push('/unauthorized');
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
