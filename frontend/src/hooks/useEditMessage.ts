import { useSelector } from "react-redux";
import { useSocket } from "../context/SocketContext";
import type { RootState } from "../store";
import { useParams } from "react-router-dom";

export type updatedMessage = {
  text: string;
  messageId: string;
};

export type editMessageType = {
  roomId: string;
  updatedMessage: updatedMessage;
};

const useEditMessage = () => {
  const { roomId } = useSelector((state: RootState) => state.messageSlice);
  const params = useParams();
  const socket = useSocket();
  const editMessage = (text: string, messageId: string) => {
    const updatedMessage = {
      text: text,
      messageId: messageId,
      type: params?.type,
    };
    const message = {
      roomId: roomId,
      updatedMessage: updatedMessage,
    };
    socket?.emit("edit-message", message);
  };
  return { editMessage };
};
export default useEditMessage;
