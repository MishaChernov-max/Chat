import Box from "@mui/material/Box";
import Chat from "../Chat/Chat";
import type { userType } from "../../api/users";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import Favorite from "../Favorite/Favorite";

export type ChatsPropsType = {
  chats: userType[];
  variant?: string;
  handleOnClick?: (...args: any[]) => any;
  isLink?: boolean;
};
function Chats({ chats, variant, handleOnClick, isLink }: ChatsPropsType) {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <Box>
        {chats.map((c) => {
          if (c._id === user?._id) {
            return (
              <Favorite
                userr={c}
                variant={variant}
                key={c._id}
                handleOnClick={handleOnClick}
                isLink={isLink}
              />
            );
          }
          return (
            <Chat
              userr={c}
              variant={variant}
              key={c._id}
              handleOnClick={handleOnClick}
              isLink={isLink}
            />
          );
        })}
      </Box>
    </>
  );
}
export default Chats;
