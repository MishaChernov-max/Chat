import { useDispatch, useSelector } from "react-redux";
import useActions from "../hooks/useActions";
import type { AppDispatch, RootState } from "../store";
import { getChatThunk } from "../store/slices/fetchUsersSlice";

function handleClickChat() {
  const { updateChatCache } = useActions();
  const { chatCache } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const currentId = user?._id || "";
  const { getRoomId, getMessages, updateChatCacheByUserId } = useActions();

  const handleClick = async (_id: string) => {
    const currentChat = chatCache.byUserId[_id];
    if (!currentChat) {
      const chat = await dispatch(
        getChatThunk({ Id: currentId, userId: _id, type: "direct" })
      ).unwrap();
      const { roomId, messages } = chat.chat;
      getRoomId(roomId);
      getMessages(messages);
      updateChatCacheByUserId({ index: _id, chat: chat });
      updateChatCache({
        index: _id,
        action: "CLEAR_NOTIFICATIONS",
        currentId: currentId,
      });
    } else {
      getRoomId(currentChat.chat.roomId);
      getMessages(currentChat.chat.messages);
      updateChatCache({
        index: _id,
        action: "CLEAR_NOTIFICATIONS",
        currentId: currentId,
      });
    }
  };
  return { handleClick };
}
export default handleClickChat;
