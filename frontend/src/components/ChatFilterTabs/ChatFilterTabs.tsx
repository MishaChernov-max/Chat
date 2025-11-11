import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { ActiveTab } from "../ChatListPanel/ChatListPanel";
import type { Dispatch, SetStateAction } from "react";

export type ChatFilterTabsType = {
  filterTabs: ActiveTab;
  setFilterTabs: Dispatch<SetStateAction<ActiveTab>>;
};

function ChatFilterTabs({ filterTabs, setFilterTabs }: ChatFilterTabsType) {
  const tabToogle = {
    color: "#FFFFFF",
    background: "transparent",
    borderRadius: "100px",
    "&:hover": {
      color: "#48736F",
      background: "#322F2FE0",
    },
  };
  const tabToogleActive = {
    color: "#48736F",
    borderRadius: "100px",
    background: "#322F2FE0",
    "&:hover": {
      color: "#48736F",
      background: "#322F2FE0",
    },
  };
  const handleClickChatsTabs = () => {
    setFilterTabs("chats");
  };
  const handleClickGroupTabs = () => {
    setFilterTabs("groups");
  };
  return (
    <>
      <Box
        sx={{
          marginTop: "21px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h5" component="h5" sx={{ mb: 1 }}>
          Message
        </Typography>
        <Box
          sx={{
            background: "#000000E0",
            borderRadius: "100px",
            paddingTop: "14px",
            paddingBottom: "14px",
            paddingLeft: "27px",
            paddingRight: "27px",
          }}
        >
          <Button
            onClick={() => {
              handleClickChatsTabs();
            }}
            sx={filterTabs === "chats" ? tabToogleActive : tabToogle}
          >
            All Chats
          </Button>
          <Button
            onClick={() => {
              handleClickGroupTabs();
            }}
            sx={filterTabs === "groups" ? tabToogleActive : tabToogle}
          >
            Groups
          </Button>
          <Button sx={tabToogle}>Contacts</Button>
        </Box>
      </Box>
    </>
  );
}
export default ChatFilterTabs;
