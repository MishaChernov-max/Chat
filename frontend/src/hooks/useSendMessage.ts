import { useSelector } from "react-redux";
import type {
  MessageType,
  MessageTypePayload,
} from "../components/Message/Message";
import { useSocket } from "../context/SocketContext";
import type { RootState } from "../store";
import useActions from "./useActions";

export type messagePayloadType = {
  roomId: string;
  message: MessageType;
};

export type ChatType = "chat" | "group";

export const useSendMessage = () => {
  const { markLoading } = useActions();
  const socket = useSocket();
  const { chat } = useSelector((state: RootState) => state.chats);
  const { roomId } = useSelector((state: RootState) => state.messageSlice);
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?._id;

  const sendMessage = (userText: string) => {
    if (!userText.trim() || !chat?._id || !user?._id) {
      return;
    }

    const messagePayload: MessageTypePayload = {
      chat: chat._id,
      sender: user._id,
      text: userText,
    };
    console.log("userText ", userText);
    console.log("messagePayload ", messagePayload);
    socket?.emit("message", messagePayload);

    markLoading();
  };

  const sendFileMessage = async (file: File, userText: string = "") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("roomId", roomId);
    formData.append("id", user?._id || "");
    formData.append("text", userText);
    formData.append("messageId", crypto.randomUUID());

    console.log("formData", formData);
    try {
      // const response = await fetch(
      //   "http://localhost:5000/api/messages/upload",
      //   {
      //     method: "POST",
      //     body: formData,
      //   }
      // );
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // return await response.json();
    } catch (error) {
      throw error;
    }
  };

  return { sendMessage, roomId, userId, sendFileMessage };
};
