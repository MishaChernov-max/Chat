import Box from "@mui/material/Box";
import MessagePanel from "../MeesagePanel/MessagePanel";
import Footer from "../Footer/Footer";
import ChatHeader from "../ChatHeader/ChatHeader";

function ChatWindow() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flex: 3,
          flexDirection: "column",
          justifyContent: "space-between",
          color: "white",
          height: "100vh",
        }}
      >
        <ChatHeader />
        <MessagePanel />
        <Footer />
      </Box>
    </>
  );
}
export default ChatWindow;
