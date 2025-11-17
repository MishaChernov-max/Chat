import Box from "@mui/material/Box";
import Messages from "../Messages/Messages";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Alert, Badge, CircularProgress, Snackbar } from "@mui/material";

function MessagePanel() {
  const { chatLoading, chatError, chat } = useSelector(
    (state: RootState) => state.chats
  );
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
        {chatError && (
          <Snackbar
            content="Возникла ошибка при загрузке чата"
            color="error"
            autoHideDuration={2000}
          />
        )}
        {chatLoading ? (
          <CircularProgress />
        ) : (
          <Messages messages={chat?.messages || []} />
        )}
      </Box>
    </>
  );
}
export default MessagePanel;
