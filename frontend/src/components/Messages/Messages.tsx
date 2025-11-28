import { useEffect, useRef, useState } from "react";
import type { MessageType } from "../Message/Message";
import Message from "../Message/Message";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { useParams } from "react-router-dom";

export type MessagesType = {
  messages: MessageType[];
};

function Messages({ messages }: MessagesType) {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const io = useRef<IntersectionObserver | null>(null);
  const [lastId, setLastId] = useState<string>("");
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messages.length) {
      setLastId(messages[0]._id as string);
    }
  }, [messages]);

  useEffect(() => {
    if (io.current) {
      io.current.disconnect();
    }
    if (!messages.length) return;
    io.current = new IntersectionObserver((entries) => {
      entries.forEach((item) => {
        if (item.isIntersecting && lastId) {
        }
      });
    });
    if (lastMessageRef.current) {
      io.current.observe(lastMessageRef.current);
    }
    return () => {
      if (lastMessageRef.current && io.current) {
        io.current.unobserve(lastMessageRef.current);
      }
      if (io.current) {
        io.current.disconnect();
      }
    };
  }, [lastId, id, dispatch, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {messages.map((message, index) => (
        <Message
          key={message._id}
          ref={index === 0 ? lastMessageRef : undefined}
          {...message}
        />
      ))}
      <div ref={messagesEndRef} />
    </>
  );
}

export default Messages;
