"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ChatInput from "@/components/chat/ChatInput";
import { SupabaseClient } from "@supabase/supabase-js";

// Define an interface for the message structure
interface ChatMessage {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data.reverse() as ChatMessage[]);
      }
    };

    fetchMessages();

    const channel = supabase
      .channel('chat_messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload) => {
        setMessages((prevMessages) => [...prevMessages, payload.new as ChatMessage]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const handleSendMessage = async (content: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from('chat_messages')
        .insert({ user_id: user.id, content });

      if (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Team Chat</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ChatMessageList messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
