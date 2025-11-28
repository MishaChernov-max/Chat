import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getChatMessagesByIdThunk,
  useChatCache,
} from "../../../store/slices/messagesSlice";
import useActions from "../../../hooks/useActions";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store";

export const useChat = () => {
  const { id } = useParams();
  const chatMessagesCache = useChatCache();
  const { getMessagesCache } = useActions();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (id) {
      const chatMessages = chatMessagesCache[id];
      if (!chatMessages) {
        dispatch(getChatMessagesByIdThunk(id));
      } else {
        getMessagesCache(id);
      }
    }
  }, [id]);
};
