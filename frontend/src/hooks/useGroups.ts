import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { groupsThunk } from "../store/slices/groupSlice";

const useGroups = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { isGroupsLoading, isGroupsError, groups } = useSelector(
    (state: RootState) => state.group
  );
  useEffect(() => {
    dispatch(groupsThunk(user?._id));
  }, []);
  return { isGroupsLoading, isGroupsError, groups };
};
export default useGroups;
