import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchChatsOverview } from "../store/slices/fetchUsersSlice";
const useFetchOverview = (userId?: string) => {
  const { user } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (userId) {
      dispatch(fetchChatsOverview(userId || ""));
    }
  }, [dispatch, userId]);
};
export default useFetchOverview;
