import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chats from "../Chats/Chats";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import { grey } from "@mui/material/colors";
import useFetchChats from "../../hooks/useFetchChats";
import StatusWrapper from "../StatusWrapper/StatusWrapper";

function CallListPanel() {
  const color = grey[50];
  const { isLoading, isError, users } = useFetchChats();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          bgcolor: "#1F1D1D",
          pt: 3,
          pb: 4,
          borderRadius: "20px",
          paddingLeft: "20px",
          paddingRight: "44px",
          color: "white",
          ml: "4px",
          height: "700px",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box sx={{ width: "100%", margin: "0 auto" }}>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <Typography variant="h4" component="h4">
              Calls
            </Typography>

            <Stack direction="row" sx={{ alignItems: "center", gap: "10px" }}>
              <IconButton aria-label="create">
                <AddCircleOutlineIcon fontSize="large" htmlColor={color} />
              </IconButton>
              <Typography variant="h4" component="h4">
                New Meet
              </Typography>
            </Stack>
          </Stack>
          <StatusWrapper isError={isError} isLoading={isLoading}>
            <Chats chats={users} variant="call" />
          </StatusWrapper>
        </Box>
      </Box>
    </>
  );
}
export default CallListPanel;
