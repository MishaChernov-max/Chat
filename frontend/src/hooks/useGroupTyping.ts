import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import useActions from "./useActions";

const useGroupTyping = () => {
  const socket = useSocket();
  const { addTypingUser, removeTypingUser } = useActions();
  useEffect(() => {
    socket?.on("user-typing:group", ({ roomId, userId }) =>
      addTypingUser({ roomId, userId })
    );
    socket?.on("user-stop:group", ({ roomId, userId }) =>
      removeTypingUser({ roomId, userId })
    );
  }, [socket]);
};
export default useGroupTyping;
