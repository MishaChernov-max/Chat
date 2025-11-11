import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import useActions from "./useActions";

export const useTypingForRoom = (chatPartnerId: string) => {
  const socket = useSocket();
  const { setTypingUser, setStopTypingUser } = useActions();

  useEffect(() => {
    socket?.on("user-typing:direct", ({ userId }) => {
      if (userId === chatPartnerId) {
        setTypingUser(userId);
      }
    });
    socket?.on("user-stop:direct", ({ userId }) => {
      if (userId === chatPartnerId) {
        setStopTypingUser(userId);
      }
    });
  }, [socket, chatPartnerId]);
};
