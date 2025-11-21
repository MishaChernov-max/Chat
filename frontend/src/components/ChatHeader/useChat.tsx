import { useDispatch, useSelector } from "react-redux";
import { getChatByIdThunk } from "../../store/slices/chatsSlice";
import type { AppDispatch, RootState } from "../../store";
import useActions from "../../hooks/useActions";
import { useEffect } from "react";

export const useChat = (id: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { replaceChat } = useActions();
  const {
    chatLoading,
    chatError,
    chatCache,
    activeChat: chat,
  } = useSelector((state: RootState) => state.chats);
  useEffect(() => {
    const currentChat = chatCache.find((c) => c._id === id);
    if (!currentChat) {
      dispatch(getChatByIdThunk(id));
    } else {
      //Если итак нахожусь в текущем чате зачем делать update chat
      // if (chat?._id !== id) {
      //   replaceChat(currentChat);
      // }
      replaceChat(currentChat);
    }
  }, [id, dispatch, chatCache]);
  return { chatLoading, chatError };
};
