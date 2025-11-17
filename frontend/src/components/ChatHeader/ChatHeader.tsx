import Box from "@mui/material/Box";
import ProfilePhoto from "../../assets/ProfilePhoto.svg";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CallActions from "../CallActions/CallActions";
import { useTypingForRoom } from "../../hooks/useTypingForRoom";
import { useParams } from "react-router-dom";
import { useChat } from "./useChat";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

function ChatHeader() {
  const params = useParams();
  const id = params.id!;
  const { chat } = useSelector((state: RootState) => state.chats);
  //Использовать индакаторы загрузки/ошибки в Messages
  // useTypingForRoom(id);
  // const isTyping = typingUsers.includes(id);
  useChat(id);
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
              src={ProfilePhoto}
              alt="ProfilePhoto"
              sx={{ width: "80px", height: "80px" }}
            />
          </Button>
          <Stack direction="column" sx={{ alignItems: "flex-start" }}>
            {/* <Typography variant="h5" component="h5">
              {isTyping ? <span>Печатает...</span> : user?.firstName}
            </Typography> */}
            <Typography variant="h5" component="h5">
              {chat?.name!}
            </Typography>
            {/* <ConnectionStatusWrapper isConnected={status} /> */}
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
