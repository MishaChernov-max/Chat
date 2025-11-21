import Box from "@mui/material/Box";
import ProfilePhoto from "../../assets/ProfilePhoto.svg";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
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
  //Использовать индакаторы загрузки/ошибки в Messages
  // useTypingForRoom(id);
  // const isTyping = typingUsers.includes(id);

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
              {currentChat?.name!}
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
