import Box from "@mui/material/Box";
import MenuBar from "../../components/MenuBar/MenuBar";
import CommunicationPanel from "../../components/CommuniactionPanel/CommunicationPanel";
import b from "../../assets/background.svg";
import { Outlet } from "react-router-dom";

function HomePage() {
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
export default HomePage;
