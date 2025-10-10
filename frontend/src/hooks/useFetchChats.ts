import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchUsers } from "../store/slices/fetchUsersSlice";
const useFetchChats = () => {
  const { isLoading, isError, users } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return { isLoading, isError, users };
};
export default useFetchChats;
