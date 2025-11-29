import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { loadUserChats } from "../store/slices/chatsSlice";
const useFetchChats = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading, isError, chats } = useSelector(
    (state: RootState) => state.chats
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loadUserChats(user?._id!));
  }, [dispatch, user?._id]);
  return { isLoading, isError, chats };
};
export default useFetchChats;
