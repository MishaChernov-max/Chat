import { useSelector } from "react-redux";
import { useSocket } from "../context/SocketContext";
import type { RootState } from "../store";
import useActions from "./useActions";
import { useParams } from "react-router-dom";

const useDeleteMessage = (messageId: string) => {
  const socket = useSocket();
  const params = useParams();
  const { roomId } = useSelector((state: RootState) => state.messageSlice);
  const message = { roomId: roomId, messageId: messageId, type: params?.type };
  const handleDeleteClick = () => {
    socket?.emit("message-delete", message);
  };
  return { handleDeleteClick };
};
export default useDeleteMessage;
