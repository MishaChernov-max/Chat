import Box from "@mui/material/Box";
import Chat from "../Chat/Chat";
import type { ChatType } from "../../store/slices/chatsSlice";

export type ChatsPropsType = {
  chats: ChatType[];
  variant?: string;
  handleOnClick?: (...args: any[]) => any;
  isLink?: boolean;
};
function Chats({ chats, handleOnClick, isLink }: ChatsPropsType) {
  console.log("chats", chats);
  if (!chats) {
    return;
  }
  return (
    <>
      <Box>
        {chats.map((c) => (
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
