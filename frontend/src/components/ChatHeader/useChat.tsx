import { useDispatch, useSelector } from "react-redux";
import { getChatByIdThunk } from "../../store/slices/chatsSlice";
import type { AppDispatch, RootState } from "../../store";
import useActions from "../../hooks/useActions";
import { useEffect } from "react";

export const useChat = (id: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { replaceChat } = useActions();
  const { isLoading, isError, chatCache } = useSelector(
    (state: RootState) => state.chats
  );
  useEffect(() => {
    const currentChat = chatCache.find((c) => c._id === id);
    if (!currentChat) {
      dispatch(getChatByIdThunk(id));
    } else {
      replaceChat(currentChat);
    }
  }, [id, dispatch, chatCache]);
  return { isLoading, isError };
};
