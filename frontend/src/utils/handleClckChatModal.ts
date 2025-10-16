import { useSelector } from "react-redux";
import { useSocket } from "../store/context/SocketContext";
import useActions from "../hooks/useActions";
import type { RootState } from "../store";
import { GetRoomId } from "../hooks/useGetRoomId";

function handleClickChatModal() {
  const { clearForwardMessage } = useActions();
  const socket = useSocket();
  const forwardMessage = useSelector(
    (state: RootState) => state.forwardMessage
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const currentId = user?._id || "";
  const { getRoomId } = useActions();
  const {
    id = "",
    text = "",
    messageId = "",
    photo = "",
  } = forwardMessage.forwardMessage || {};

  const originForwardMessage = {
    id,
    text,
    messageId,
    photo,
    forwardedFrom: user?.email,
  };
  const handleClick = (_id: string) => {
    const roomId = GetRoomId(_id, currentId);
    getRoomId(roomId);
    const message = {
      roomId: roomId,
      forwardMessage: originForwardMessage,
    };
    socket?.emit("join-room", roomId);
    socket?.emit("message-forward", message);
    clearForwardMessage();
  };
  return { handleClick };
}
export default handleClickChatModal;
