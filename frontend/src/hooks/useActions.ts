import { useDispatch } from "react-redux";
import { actions as messagesSliceCreators } from "../store/messagesSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { actions as authSliceCreators } from "../store/slices/authSlice";
import { actions as onlineUsersSliceCreators } from "../store/slices/onlineUsersSlice";
import { actions as notificationSliceCreators } from "../store/slices/notificationSlice";
import { actions as forwardMessageSliceCreators } from "../store/slices/forwardMessageSlice";

const useActions = () => {
  const dispatch = useDispatch();
  const rootactionCreators = {
    ...authSliceCreators,
    ...messagesSliceCreators,
    ...onlineUsersSliceCreators,
    ...notificationSliceCreators,
    ...forwardMessageSliceCreators,
  };
  return useMemo(
    () => bindActionCreators(rootactionCreators, dispatch),
    [dispatch]
  );
};
export default useActions;
