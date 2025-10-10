import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CallActions from "../CallActions/CallActions";
import type { userType } from "../../api/users";
import { Link } from "react-router-dom";
import { useSocket } from "../../store/context/SocketContext";
import useActions from "../../hooks/useActions";
import { GetRoomId } from "../../hooks/useGetRoomId";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useGetNotifications } from "./getNotifications";
import { useUserTyping } from "../../hooks/useUserStatus";

export type ChatTPropsType = {
  userr: userType;
  variant?: string;
};
function Chat({ userr, variant }: ChatTPropsType) {
  const { user } = useSelector((state: RootState) => state.auth);

  const { getRoomId, getMessages, addtNotification } = useActions();

  const { getNotifications } = useGetNotifications();

  const currentId = user?._id || "";

  const socket = useSocket();

  const { _id, email, photo, isOnline } = userr;
  const isTyping = useUserTyping(_id);
  const space = variant === "call" ? "space-between" : "flex-start";
  return (
    <>
      <Link to={`/user/:${_id}`}>
        <Box
          onClick={() => {
            const roomId = GetRoomId(_id, currentId);
            console.log("_id", _id, currentId, "currentId");
            console.log("roomId", roomId);
            getRoomId(roomId);
            socket?.emit("join-room", roomId);
            socket?.emit("get-history", roomId);

            socket?.on("history", (chat) => {
              if (roomId === chat.roomId) {
                getMessages(chat.messages);
              }
            });
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: space,
              alignItems: "center",
              gap: "20px",
              width: "400px",
              borderRadius: "10px",
              paddingRight: "19px",
              paddingLeft: "14px",
              paddingTop: "9px",
              paddingBottom: "12px",
              bgcolor: "#312F2F",
              marginTop: "20px",
              cursor: "pointer",
            }}
          >
            {isTyping && <span>Печатает....</span>}
            <Avatar
              src={photo}
              alt="Фото Профиля"
              sx={{
                width: "80px",
                height: "80px",
              }}
            />
            {isOnline && (
              <Box
                sx={{
                  position: "relative",
                  right: "35px",
                  bottom: "20px",
                  background: "green",
                  width: "15px",
                  height: "15px",
                  backgroundColor: "#00FF38",
                  borderRadius: "8px",
                }}
              ></Box>
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="h6" component="h6">
                {email}
              </Typography>
              <Typography variant="h6" component="h6" sx={{ color: "#767876" }}>
                {email}
              </Typography>
            </Box>
            {variant === "call" && <CallActions />}
          </Box>
        </Box>
      </Link>
    </>
  );
}
export default Chat;
