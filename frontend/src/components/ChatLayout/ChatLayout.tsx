import Box from "@mui/material/Box";
import b from "../../assets/background.svg";
import MenuBar from "../MenuBar/MenuBar";
import CommunicationPanel from "../CommuniactionPanel/CommunicationPanel";
import { Outlet } from "react-router-dom";
function ChatLayout() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          backgroundImage: `url(${b})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <MenuBar sx={{ flex: 0.25 }} />
        <CommunicationPanel sx={{ flex: 1 }} />
        <Outlet />
      </Box>
    </>
  );
}
export default ChatLayout;
