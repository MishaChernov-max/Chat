import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CallActions from "../CallActions/CallActions";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

function ChatHeader() {
  const { id } = useParams();
  const { chats } = useSelector((state: RootState) => state.chats);
  const currentChat = chats.find((chat) => chat._id === id);
  return (
    <>
      <Box
        sx={{
          color: "white",
          background: "#1F1D1D",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "12px",
          paddingRight: "60px",
          marginBottom: "40px",
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <Button href="#text-buttons">
            <Avatar
              src={currentChat?.avatar}
              alt="ProfilePhoto"
              sx={{ width: "60px", height: "60px" }}
            />
          </Button>
          <Stack direction="column" sx={{ alignItems: "flex-start" }}>
            <Typography variant="h5" component="h5">
              {currentChat?.name!}
            </Typography>
          </Stack>
        </Stack>
        <Stack>
          <CallActions />
        </Stack>
      </Box>
    </>
  );
}
export default ChatHeader;
