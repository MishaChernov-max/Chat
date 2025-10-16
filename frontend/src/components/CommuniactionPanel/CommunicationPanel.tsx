import { Stack, type SxProps } from "@mui/material";
import ChatListPanel from "../ChatListPanel/ChatListPanel";
import CallListPanel from "../CallListPanel/CallListPanel";
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
        <ChatListPanel handleOnClick={handleClickChat} />
        <CallListPanel />
      </Stack>
    </>
  );
}
export default CommunicationPanel;
