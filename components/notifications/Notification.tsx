"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Toast } from "@/components/ui/toast";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("notifications")
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications" }, (payload) => {
        setNotifications((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {notifications.map((notification) => (
        <Toast key={notification.id} title={notification.title} description={notification.message} />
      ))}
    </div>
  );
}