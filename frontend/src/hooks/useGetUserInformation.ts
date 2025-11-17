import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchUser } from "../store/slices/usersSlice";

const useGetUserInformation = (_id: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isUserLoading, isUserError, user } = useSelector(
    (state: RootState) => state.users
  );
  useEffect(() => {
    if (_id) {
      dispatch(fetchUser(_id));
    }
  }, [_id, dispatch]);
  console.log("id", _id);
  console.log("user", user);
  return { isUserLoading, isUserError, user };
};
export default useGetUserInformation;
