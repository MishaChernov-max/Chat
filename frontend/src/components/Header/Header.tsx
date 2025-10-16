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
import { useUserTyping } from "../../hooks/useUserStatus";

export type HeaderType = {
  id: string;
};

function Header({ id }: HeaderType) {
  const onlineUsers = useSelector((state: RootState) => state.onlineUsers);
  console.log("onlineUsers", onlineUsers);
  const st = onlineUsers.find((u) => u === id);
  const status = Boolean(st);
  console.log("status", status);
  const { isLoading, isError, user } = useGetUserInformation(id);
  const isTyping = useUserTyping(id);
  console.log("isTyping в Header", isTyping);
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
        <StatusWrapper isError={isError} isLoading={isLoading}>
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
                {isTyping ? <span>Печатает...</span> : user?.email}
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
export default Header;
