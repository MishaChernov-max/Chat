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
import { useState } from "react";
import GroupList from "../GroupListPanel/GroupListPanel";

type ChatListPanelType = {
  sx?: SxProps;
  handleOnClick?: (...args: any[]) => any;
  showFilterTabs: boolean;
  isLink?: boolean;
};

export type ActiveTab = "chats" | "groups";

function ChatListPanel({
  sx,
  handleOnClick,
  showFilterTabs,
  isLink,
}: ChatListPanelType) {
  const [filterTabs, setFilterTabs] = useState<ActiveTab>("chats");
  const { chats } = useSelector((state: RootState) => state.users);
  let sortedChats: userType[] = [];
  const { onlineUsers } = useSelector((state: RootState) => state.users);
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
        {showFilterTabs && (
          <ChatFilterTabs
            filterTabs={filterTabs}
            setFilterTabs={setFilterTabs}
          />
        )}
        {filterTabs === "chats" ? (
          <StatusWrapper isError={isError} isLoading={isLoading}>
            {chats.length > 0 ? (
              <Chats
                chats={sortedChats}
                handleOnClick={handleOnClick}
                isLink={isLink}
              />
            ) : (
              <Chats
                chats={sortedUsers}
                handleOnClick={handleOnClick}
                isLink={isLink}
              />
            )}
          </StatusWrapper>
        ) : (
          <GroupList />
        )}
      </Box>
    </>
  );
}
export default ChatListPanel;
