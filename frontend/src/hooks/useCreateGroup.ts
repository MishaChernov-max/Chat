import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { groupThunk } from "../store/slices/groupSlice";
import useActions from "./useActions";

const useCreateGroup = () => {
  const { addGroup } = useActions();
  const { isLoading, isError } = useSelector((state: RootState) => state.group);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const handleCreateGroupClick = async (groupName: string) => {
    const result = await dispatch(
      groupThunk({ userId: user?._id, groupName: groupName })
    ).unwrap();
    console.log("result", result);
    addGroup(result);
  };
  return { isLoading, isError, handleCreateGroupClick };
};
export default useCreateGroup;
