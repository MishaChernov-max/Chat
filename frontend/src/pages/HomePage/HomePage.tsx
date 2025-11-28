import Box from "@mui/material/Box";
import MenuBar from "../../components/MenuBar/MenuBar";
import CommunicationPanel from "../../components/CommuniactionPanel/CommunicationPanel";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material";

function HomePage() {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          backgroundImage: theme.custom.backgroundImage,
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
