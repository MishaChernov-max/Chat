import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

export const useUserTyping = (chatPartnerId: string) => {
  const socket = useSocket();
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket?.on("user-typing:direct", ({ userId }) => {
      console.log(
        " ChatHeader получил событие от",
        userId,
        "Ожидаю",
        chatPartnerId
      );
      if (userId === chatPartnerId) {
        setIsTyping(true);
        console.log("userId печатающего ", userId);
      }
    });
    socket?.on("user-stop:direct", ({ userId }) => {
      if (userId === chatPartnerId) {
        setIsTyping(false);
      }
    });
  }, [socket, chatPartnerId]);

  return isTyping;
};
