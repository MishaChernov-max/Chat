import { useSelector } from "react-redux";
import { useSocket } from "../store/context/SocketContext";
import useActions from "../hooks/useActions";
import type { RootState } from "../store";
import { GetRoomId } from "../hooks/useGetRoomId";

function handleClickChat() {
  const socket = useSocket();
  const { user } = useSelector((state: RootState) => state.auth);
  const currentId = user?._id || "";
  const { getRoomId, getMessages } = useActions();

  const handleClick = (_id: string) => {
    const roomId = GetRoomId(_id, currentId);
    console.log("_id", _id, currentId, "currentId");
    console.log("roomId", roomId);
    getRoomId(roomId);
    socket?.emit("join-room", roomId);
    socket?.emit("get-history", roomId);
    socket?.on("history", (chat) => {
      if (roomId === chat.roomId) {
        getMessages(chat.messages);
      }
    });
  };
  return { handleClick };
}
export default handleClickChat;
