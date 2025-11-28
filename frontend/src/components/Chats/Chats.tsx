import Box from "@mui/material/Box";
import Chat from "../Chat/Chat";
import type { ChatType } from "../../store/slices/chatsSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import User from "../User/User";
import { useUserClick } from "../User/useUserClick";

export type ChatsPropsType = {
  chats: ChatType[];
  variant?: string;
  handleOnClick?: (...args: any[]) => any;
  isLink?: boolean;
};
function Chats({ chats, handleOnClick, isLink }: ChatsPropsType) {
  const matchedChats = useSelector((state: RootState) => state.users.chats);
  return (
    <>
      <Box>
        {matchedChats.length > 0
          ? matchedChats.map((u) => (
              <User key={u._id} handleOnClick={useUserClick} user={u} />
            ))
          : chats.map((c) => (
              <Chat
                chat={c}
                key={c._id}
                handleOnClick={handleOnClick}
                isLink={isLink}
              />
            ))}
      </Box>
    </>
  );
}
export default Chats;
