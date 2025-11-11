import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import {
  fetchChatsOverview,
  fetchUsers,
} from "../store/slices/fetchUsersSlice";
const useFetchChats = () => {
  const { user } = useSelector((state: RootState) => state.users);
  const { isLoading, isError, users } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  useEffect(() => {
    console.log("user?._id fetchUsers ", user?._id);
    dispatch(fetchChatsOverview(user?._id || ""));
  }, [dispatch, user?._id]);
  return { isLoading, isError, users };
};
export default useFetchChats;
