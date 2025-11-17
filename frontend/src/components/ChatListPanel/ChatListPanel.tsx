import { Box, type SxProps } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
import ChatFilterTabs from "../ChatFilterTabs/ChatFilterTabs";
import Chats from "../Chats/Chats";
import useFetchChats from "../../hooks/useFetchChats";
import StatusWrapper from "../StatusWrapper/StatusWrapper";
import { useState } from "react";
import GroupList from "../GroupListPanel/GroupListPanel";
import UserList from "../UserListPanel/UserList";
import { useUserClick } from "../User/useUserClick";

type ChatListPanelType = {
  sx?: SxProps;
  handleOnClick?: (...args: any[]) => any;
  showFilterTabs: boolean;
  isLink?: boolean;
};

export type ActiveTab = "chats" | "groups" | "users";

function ChatListPanel({ sx, showFilterTabs, isLink }: ChatListPanelType) {
  const [filterTabs, setFilterTabs] = useState<ActiveTab>("chats");

  const { chatsLoading, chatsError, chats } = useFetchChats();

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

        {/* Отдельный компонент для условного рендеринга */}
        {filterTabs === "users" ? (
          <UserList handleOnClick={useUserClick} />
        ) : filterTabs === "chats" ? (
          <StatusWrapper isError={chatsError} isLoading={chatsLoading}>
            {chats.length > 0 ? (
              <Chats chats={chats} isLink={isLink} />
            ) : (
              <h2>Чатов нету</h2>
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
