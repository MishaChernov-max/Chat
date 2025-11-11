import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { getGroupById } from "../store/slices/groupSlice";

const useGetGroup = (groupId: string) => {
  const { isGetGroupLoading, isGetGroupError, group } = useSelector(
    (state: RootState) => state.group
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getGroupById(groupId));
  }, [groupId]);
  return { isGetGroupLoading, isGetGroupError, group };
};
export default useGetGroup;
