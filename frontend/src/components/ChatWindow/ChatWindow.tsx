import Box from "@mui/material/Box";
import Header from "../Header/Header";
import MessagePanel from "../MeesagePanel/MessagePanel";
import Footer from "../Footer/Footer";
import { useParams } from "react-router-dom";

function ChatWindow() {
  const params = useParams();
  const id = params.id?.replace(":", "") || "";
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
        <Header id={id} />
        <MessagePanel />
        <Footer />
      </Box>
    </>
  );
}
export default ChatWindow;
