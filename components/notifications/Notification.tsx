"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

// Define the shape of a notification
interface Notification {
  id: string;
  title: string;
  message: string;
}

export default function Notification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    const channel = supabase
      .channel("notifications")
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications" }, (payload) => {
        const newNotification = payload.new as Notification;
        setNotifications((prev) => [...prev, newNotification]);
        
        // Show the toast for the new notification
        toast({
          title: newNotification.title,
          description: newNotification.message,
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, toast]);

  // We don't need to render individual Toast components here
  // The toast function from useToast will handle displaying notifications
  return null;
}
