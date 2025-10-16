import { Box, type SxProps } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
import ChatFilterTabs from "../ChatFilterTabs/ChatFilterTabs";
import Chats from "../Chats/Chats";
import useFetchChats from "../../hooks/useFetchChats";
import StatusWrapper from "../StatusWrapper/StatusWrapper";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { enrichUsersWithOnlineStatus } from "./enrichUsersWithOnlineStatus";
import type { userType } from "../../api/users";
import type { MessageType } from "../Message/Message";

type ChatListPanelType = {
  sx?: SxProps;
  handleOnClick?: () => {
    handleClick: (_id: string, forwardMessage?: MessageType) => void;
  };
};

function ChatListPanel({ sx, handleOnClick }: ChatListPanelType) {
  const { chats } = useSelector((state: RootState) => state.searchSlice);
  let sortedChats: userType[] = [];
  const onlineUsers = useSelector((state: RootState) => state.onlineUsers);
  const { isLoading, isError, users } = useFetchChats();
  if (chats.length > 0) {
    sortedChats = enrichUsersWithOnlineStatus(chats, onlineUsers);
  }
  const sortedUsers = enrichUsersWithOnlineStatus(users, onlineUsers);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          bgcolor: "#1F1D1D",
          pt: 3,
          pb: 4,
          paddingLeft: "20px",
          paddingRight: "44px",
          color: "white",
          ml: "4px",
          height: "665px",
          borderRadius: "0 0 20px 20px",
          overflow: "auto",
          ...{ sx },
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <SearchBar />
        <ChatFilterTabs />
        <StatusWrapper isError={isError} isLoading={isLoading}>
          {chats.length > 0 ? (
            <Chats chats={sortedChats} handleOnClick={handleOnClick} />
          ) : (
            <Chats chats={sortedUsers} handleOnClick={handleOnClick} />
          )}
        </StatusWrapper>
      </Box>
    </>
  );
}
export default ChatListPanel;
