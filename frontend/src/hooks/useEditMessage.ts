import { useSelector } from "react-redux";
import { useSocket } from "../store/context/SocketContext";
import type { RootState } from "../store";

const useEditMessage = () => {
  const { roomId } = useSelector((state: RootState) => state.messageSlice);
  const socket = useSocket();
  const editMessage = (text: string, messageId: string) => {
    const updatedMessage = {
      text: text,
      messageId: messageId,
    };
    const message = {
      roomId: roomId,
      updatedMessage: updatedMessage,
    };
    console.log("Отправлен message", message);
    socket?.emit("edit-message", message);
  };
  return { editMessage };
};
export default useEditMessage;
