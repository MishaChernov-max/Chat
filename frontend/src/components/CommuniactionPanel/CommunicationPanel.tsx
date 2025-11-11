import { Stack, type SxProps } from "@mui/material";
import CallListPanel from "../CallListPanel/CallListPanel";
import ChatListPanel from "../ChatListPanel/ChatListPanel";
import handleClickChat from "../../utils/handleClickChat";

type ChatListPanelType = {
  sx: SxProps;
};

function CommunicationPanel({ sx }: ChatListPanelType) {
  return (
    <>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          ...{ sx },
        }}
      >
        <ChatListPanel showFilterTabs={true} handleOnClick={handleClickChat} />
        <CallListPanel />
      </Stack>
    </>
  );
}
export default CommunicationPanel;
