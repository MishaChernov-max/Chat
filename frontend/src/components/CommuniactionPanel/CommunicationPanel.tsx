import { Stack, type SxProps } from "@mui/material";
import ChatListPanel from "../ChatListPanel/ChatListPanel";
import CallListPanel from "../CallListPanel/CallListPanel";

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
        <ChatListPanel />
        <CallListPanel />
      </Stack>
    </>
  );
}
export default CommunicationPanel;
