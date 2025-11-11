import { useDispatch, useSelector } from "react-redux";
import useActions from "./useActions";
import type { AppDispatch, RootState } from "../store";
import { getGroupChatThunk } from "../store/slices/groupSlice";

const useGroupClick = (groupId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { updateChatCacheByGroupId } = useActions();
  const { roomId } = useSelector((state: RootState) => state.messageSlice);
  const { chatCache } = useSelector((state: RootState) => state.users);
  const { getMessages, getRoomId } = useActions();
  const handleGroupClick = async () => {
    const group = chatCache.byGroupId[groupId];
    console.log("group", group);
    if (!group) {
      const g = await dispatch(
        getGroupChatThunk({ Id: groupId, type: "group" })
      ).unwrap();
      console.log("g", g);
      getRoomId(g.roomId);
      getMessages(g.messages);
      updateChatCacheByGroupId({ index: groupId, group: g });
      console.log("Извлекаю группу", group);
    } else {
      console.log("Попадаю в кэш", roomId);
      getRoomId(group.roomId);
      getMessages(group.messages);
      console.log("rooomId", roomId);
    }
  };
  return { handleGroupClick };
};
export default useGroupClick;
