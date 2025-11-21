import { useEffect, useRef } from "react";
import type { MessageType } from "../Message/Message";
import Message from "../Message/Message";

export type MessagesType = {
  messages: MessageType[];
};

function Messages({ messages }: MessagesType) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {messages.map((message) => (
        <Message key={message._id} {...message} />
      ))}
      <div ref={messagesEndRef} />
    </>
  );
}

export default Messages;
