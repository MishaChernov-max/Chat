import { useSelector } from "react-redux";
import ChatHeader from "../ChatHeader/ChatHeader";
import GroupHeader from "../GroupHeader/GroupHeader";
import type { RootState } from "../../store";
import FavoriteHeader from "../FavoriteHeader/FavoriteHeader";

export type ChatTypeRendererType = {
  id: string;
  type?: string;
};
function ChatTypeRenderer({ id, type }: ChatTypeRendererType) {
  const { user } = useSelector((state: RootState) => state.auth);
  if (type === "group") {
    return <GroupHeader id={id} />;
  } else if (type === "chat" && id === user?._id) {
    return <FavoriteHeader />;
  }
  return <ChatHeader id={id} />;
}
export default ChatTypeRenderer;
