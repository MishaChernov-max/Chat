import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { fetchUsers } from "../../store/slices/usersSlice";
import { useEffect } from "react";

export const useFetchUsers = () => {
  const { isLoading, isError, users } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return { isLoading, isError, users };
};
