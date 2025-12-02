import { Stack, type SxProps } from "@mui/material";
import ChatListPanel from "../ChatListPanel/ChatListPanel";

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
        <ChatListPanel showFilterTabs={true} isLink={true} />
      </Stack>
    </>
  );
}
export default CommunicationPanel;
