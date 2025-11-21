import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useTypingForRoom } from "../../hooks/useTypingForRoom";
import type { ChatType } from "../../store/slices/chatsSlice";
import { Avatar, Badge } from "@mui/material";
import { useRoomId } from "../../store/slices/messagesSlice";

export type ChatTPropsType = {
  chat: ChatType;
  handleOnClick?: Function;
  isLink?: boolean;
};
function Chat({ chat, handleOnClick, isLink = true }: ChatTPropsType) {
  const { handleClick } = handleOnClick
    ? handleOnClick()
    : { handleClick: () => {} };
  const roomId = useRoomId();
  const { typingUsers } = useSelector((state: RootState) => state.users);
  const { _id, name, avatar } = chat;
  const isActive = roomId === _id;
  useTypingForRoom(_id);
  const isTyping = typingUsers.includes(_id);

  const content = (
    <Box
      onClick={() => {
        handleClick(_id);
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "20px",
          width: "400px",
          borderRadius: "10px",
          paddingRight: "19px",
          paddingLeft: "14px",
          paddingTop: "9px",
          paddingBottom: "12px",
          bgcolor: isActive ? "#7A5AF8" : "#312F2F",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        {/* <Badge
          badgeContent={}
          color="info"
          overlap="circular"
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "12px",
              height: "20px",
              minWidth: "20px",
              transform: "translate(-50px)",
            },
          }}
        >
          <Avatar
            src={avatar}
            alt="Фото Профиля"
            sx={{ width: "80px", height: "80px" }}
          />
          2131
        </Badge> */}

        <Avatar
          src={avatar}
          alt="Фото Профиля"
          sx={{ width: "80px", height: "80px" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* <Typography variant="h6" component="h6">
            {isTyping ? <span>Печатает....</span> : firstName}
          </Typography> */}
          <Typography variant="h6" component="h6" sx={{ color: "#767876" }}>
            {name}
          </Typography>
          {/* <Typography variant="h6" component="h6" sx={{ color: "#767876" }}>
            w1q
          </Typography> */}
        </Box>
      </Box>
    </Box>
  );
  return isLink ? <Link to={`/chat/${_id}`}>{content}</Link> : content;
}
export default Chat;
