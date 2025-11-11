import Box from "@mui/material/Box";
import Header from "../Header/Header";
import MessagePanel from "../MeesagePanel/MessagePanel";
import Footer from "../Footer/Footer";

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
        <Header />
        <MessagePanel />
        <Footer />
      </Box>
    </>
  );
}
export default ChatWindow;
