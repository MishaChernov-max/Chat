import Box from "@mui/material/Box";
import Messages from "../Messages/Messages";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { CircularProgress, Snackbar } from "@mui/material";
import { useChatMessages } from "../../store/slices/messagesSlice";
import { useChat } from "../Chat/hooks/useChat";

function MessagePanel() {
  useChat();
  const messages = useChatMessages();
  const { isLoading, isError } = useSelector((state: RootState) => state.chats);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "96%",
          margin: "0 30px",
          flex: 1,
          overflow: "auto",
          mb: 3,
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {isError && (
          <Snackbar
            content="Возникла ошибка при загрузке чата"
            color="error"
            autoHideDuration={2000}
          />
        )}
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Messages messages={messages || []} />
        )}
      </Box>
    </>
  );
}
export default MessagePanel;
