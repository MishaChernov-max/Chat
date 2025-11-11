import { useDispatch } from "react-redux";
import { actions as messagesSliceCreators } from "../store/slices/messagesSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { actions as authSliceCreators } from "../store/slices/authSlice";
import { actions as groupSliceCreators } from "../store/slices/groupSlice";
import { actions as usersSliceCreators } from "../store/slices/fetchUsersSlice";

const useActions = () => {
  const dispatch = useDispatch();
  const rootactionCreators = {
    ...authSliceCreators,
    ...messagesSliceCreators,
    ...groupSliceCreators,
    ...usersSliceCreators,
  };
  return useMemo(
    () => bindActionCreators(rootactionCreators, dispatch),
    [dispatch]
  );
};
export default useActions;
