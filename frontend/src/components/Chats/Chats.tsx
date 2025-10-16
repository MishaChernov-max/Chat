import Box from "@mui/material/Box";
import Chat from "../Chat/Chat";
import type { userType } from "../../api/users";

export type ChatsPropsType = {
  chats: userType[];
  variant?: string;
  handleOnClick?: () => { handleClick: (_id: string) => void };
};
function Chats({ chats, variant, handleOnClick }: ChatsPropsType) {
  return (
    <>
      <Box>
        {chats.map((c) => (
          <Chat
            userr={c}
            variant={variant}
            key={c._id}
            handleOnClick={handleOnClick}
          />
        ))}
      </Box>
    </>
  );
}
export default Chats;
