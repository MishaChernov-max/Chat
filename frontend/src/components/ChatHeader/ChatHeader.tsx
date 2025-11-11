import Box from "@mui/material/Box";
import ProfilePhoto from "../../assets/ProfilePhoto.svg";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CallActions from "../CallActions/CallActions";
import useGetUserInformation from "../../hooks/useGetUserInformation";
import ConnectionStatusWrapper from "../ConnectionStatusWrapper/ConnectionStatusWrapper";
import StatusWrapper from "../StatusWrapper/StatusWrapper";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useTypingForRoom } from "../../hooks/useTypingForRoom";

export type ChatHeaderType = {
  id: string;
};
function ChatHeader({ id }: ChatHeaderType) {
  const { onlineUsers, typingUsers } = useSelector(
    (state: RootState) => state.users
  );
  const st = onlineUsers.find((u) => u === id);
  const status = Boolean(st);
  const { isUserLoading, isUserError, user } = useGetUserInformation(id);
  useTypingForRoom(id);
  const isTyping = typingUsers.includes(id);
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
        <StatusWrapper isError={isUserError} isLoading={isUserLoading}>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Button href="#text-buttons">
              <Avatar
                src={ProfilePhoto}
                alt="ProfilePhoto"
                sx={{ width: "80px", height: "80px" }}
              />
            </Button>
            <Stack direction="column" sx={{ alignItems: "flex-start" }}>
              <Typography variant="h5" component="h5">
                {isTyping ? <span>Печатает...</span> : user?.firstName}
              </Typography>
              <ConnectionStatusWrapper isConnected={status} />
            </Stack>
          </Stack>
          <Stack>
            <CallActions />
          </Stack>
        </StatusWrapper>
      </Box>
    </>
  );
}
export default ChatHeader;
