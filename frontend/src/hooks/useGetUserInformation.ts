import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchUser } from "../store/slices/fetchUserSlice";

const useGetUserInformation = (_id: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, user } = useSelector(
    (state: RootState) => state.user
  );
  useEffect(() => {
    if (_id) {
      dispatch(fetchUser(_id));
    }
  }, [_id, dispatch]);
  console.log("id", _id);
  console.log("user", user);
  return { isLoading, isError, user };
};
export default useGetUserInformation;
