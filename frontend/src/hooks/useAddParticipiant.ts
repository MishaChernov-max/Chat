import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { addMember } from "../store/slices/groupSlice";
import type { AddMemberType } from "../api/groups";
import useActions from "./useActions";

export const useAddParticipiant = () => {
  const { updateGroupMembers } = useActions();
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = async (memberId: string, groupId: string) => {
    const groupData: AddMemberType = {
      groupId: groupId,
      memberId: memberId,
    };
    const updatedGroup = await dispatch(addMember(groupData)).unwrap();
    updateGroupMembers({
      groupId: groupId,
      participiants: updatedGroup.participiants,
    });
  };
  return { handleClick };
};
export default useAddParticipiant;
