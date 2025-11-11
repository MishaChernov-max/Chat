import { useSelector } from "react-redux";
import { useSocket } from "../context/SocketContext";
import useActions from "../hooks/useActions";
import type { RootState } from "../store";

function handleClickChatModal() {
  const { clearForwardMessage } = useActions();
  const socket = useSocket();
  const { forwardMessage } = useSelector(
    (state: RootState) => state.messageSlice
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const currentId = user?._id || "";
  const handleClick = (_id: string) => {
    const message = {
      roomId: { currentId: currentId, userId: _id },
      forwardMessage: forwardMessage,
    };
    socket?.emit("message-forward", message);
    clearForwardMessage();
  };
  return { handleClick };
}
export default handleClickChatModal;
