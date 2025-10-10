import Box from "@mui/material/Box";
import Messages from "../Messages/Messages";
import useGetMessage from "../../hooks/useGetMessages";

function MessagePanel() {
  const messages = useGetMessage();
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
