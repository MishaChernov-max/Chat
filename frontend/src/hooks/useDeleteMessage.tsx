import { useSelector } from "react-redux";
import { useSocket } from "../store/context/SocketContext";
import type { RootState } from "../store";
import useActions from "./useActions";
import { useEffect } from "react";

const useDeleteMessage = (messageId: string) => {
  const socket = useSocket();
  const { getMessages, markLoading, undoLoading } = useActions();
  const roomId = useSelector((state: RootState) => state.messageSlice);
  const message = { roomId: roomId.roomId, messageId: messageId };
  const handleDeleteClick = () => {
    socket?.emit("message-delete", message);
    markLoading();
  };
  useEffect(() => {
    socket?.on("messageDeleted", (response) => {
      if (roomId.roomId === response.roomId) {
        setTimeout(() => {
          undoLoading();
          getMessages(response.messages);
        }, 3000);
      }
    });
  }, [roomId, getMessages]);

  return { handleDeleteClick };
};
export default useDeleteMessage;
