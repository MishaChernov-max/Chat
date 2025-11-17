import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { loadUserChats } from "../store/slices/chatsSlice";
const useFetchChats = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { chatsLoading, chatsError, chats } = useSelector(
    (state: RootState) => state.chats
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loadUserChats(user?._id!));
  }, [dispatch, user?._id]);
  return { chatsLoading, chatsError, chats };
};
export default useFetchChats;
