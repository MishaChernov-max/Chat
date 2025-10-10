import { useEffect, useState } from "react";
import { useSocket } from "../store/context/SocketContext";

export const useUserTyping = (chatPartnerId: string) => {
  const socket = useSocket();
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket?.on("user-typing", ({ userId }) => {
      if (userId === chatPartnerId) {
        setIsTyping(true);
      }
    });

    socket?.on("user-stop", ({ userId }) => {
      if (userId === chatPartnerId) {
        setIsTyping(false);
      }
    });

    return () => {
      socket?.off("user-typing");
      socket?.off("user-stop");
    };
  }, [socket, chatPartnerId]);

  return isTyping;
};
