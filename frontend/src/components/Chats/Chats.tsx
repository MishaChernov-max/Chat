import Box from "@mui/material/Box";
import Chat from "../Chat/Chat";
import type { userType } from "../../api/users";

export type ChatsPropsType = {
  chats: userType[];
  variant?: string;
};
function Chats({ chats, variant }: ChatsPropsType) {
  return (
    <>
      <Box>
        {chats.map((c) => (
          <Chat userr={c} variant={variant} key={c._id} />
        ))}
      </Box>
    </>
  );
}
export default Chats;
