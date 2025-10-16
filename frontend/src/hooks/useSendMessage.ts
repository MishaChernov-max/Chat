import { useSelector } from "react-redux";
import type { MessageType } from "../components/Message/Message";
import { useSocket } from "../store/context/SocketContext";
import type { RootState } from "../store";
import useActions from "./useActions";

export type messagePayloadType = {
  roomId: string;
  message: MessageType;
};

export const useSendMessage = () => {
  const { markLoading } = useActions();
  const socket = useSocket();
  const { roomId } = useSelector((state: RootState) => state.messageSlice);
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?._id;
  console.log("user при отправке", user);
  console.log("user?.id", user?._id);
  const sendMessage = (userText: string) => {
    const message: MessageType = {
      id: user?._id || "",
      messageId: crypto.randomUUID(),
      text: userText,
    };
    const messagePayload: messagePayloadType = {
      roomId: roomId,
      message: message,
    };
    console.log("Отправляю message", messagePayload);
    markLoading();
    socket?.emit("message", messagePayload);
  };
  return { sendMessage, roomId, userId };
};
