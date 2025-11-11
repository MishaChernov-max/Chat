import Box from "@mui/material/Box";
import Messages from "../Messages/Messages";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

function MessagePanel() {
  const { messages } = useSelector((state: RootState) => state.messageSlice);
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
        <Messages messages={messages} />
      </Box>
    </>
  );
}
export default MessagePanel;
