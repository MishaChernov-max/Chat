import { useEffect } from "react";
import { useSocket } from "../store/context/SocketContext";
import useActions from "./useActions";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const useGetMessage = () => {
  const { getMessages } = useActions();
  const { roomId, messages } = useSelector(
    (state: RootState) => state.messageSlice
  );
  const socket = useSocket();
  useEffect(() => {
    socket?.on("new-message", (chat) => {
      console.log("Получаю чат", chat);
      const { messages } = chat;
      console.log("messages", messages);
      if (roomId === chat.roomId) {
        getMessages(messages);
      }
    });
    return () => {
      socket?.off("new-message");
    };
  }, [socket, roomId]);
  return messages;
};
export default useGetMessage;
