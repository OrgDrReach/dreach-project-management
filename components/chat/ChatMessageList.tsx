import { useEffect, useRef } from 'react';

// Define an interface for the message object
interface Message {
  id: string;
  user_id: string;
  content: string;
}

// Add type annotation for the messages prop
export default function ChatMessageList({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="h-96 overflow-y-auto p-4">
      {messages.map((message: Message) => (
        <div key={message.id} className="mb-4">
          <p className="font-bold">{message.user_id}</p>
          <p>{message.content}</p>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
