import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CallActions from "../CallActions/CallActions";
import type { userType } from "../../api/users";
import { Link } from "react-router-dom";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";
import { useTypingForRoom } from "../../hooks/useTypingForRoom";

export type ChatTPropsType = {
  userr: userType;
  variant?: string;
  handleOnClick?: Function;
  isLink?: boolean;
};
function Chat({
  userr,
  variant,
  handleOnClick,
  isLink = true,
}: ChatTPropsType) {
  const type = "chat";
  const { handleClick } = handleOnClick
    ? handleOnClick()
    : { handleClick: () => {} };
  const { _id, photo, isOnline, firstName, surName } = userr;
  const { chatCache, chatsOverview, typingUsers } = useSelector(
    (state: RootState) => state.users
  );
  const unreadInfo = chatsOverview.find((counter) => counter.senderId === _id);
  console.log("unreadInfo", unreadInfo);
  const unreadCount = chatCache.byUserId[_id]?.chat?.unreadCount || 0;
  // const isTyping = useUserTyping(_id);
  useTypingForRoom(_id);
  const isTyping = typingUsers.includes(_id);
  const space = variant === "call" ? "space-between" : "flex-start";
  const content = (
    <Box
      onClick={() => {
        handleClick(_id);
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
        <Badge
          badgeContent={unreadInfo?.unreadCount || unreadCount}
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
            src={photo}
            alt="Фото Профиля"
            sx={{ width: "80px", height: "80px" }}
          />
        </Badge>
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
            {isTyping ? <span>Печатает....</span> : firstName}
          </Typography>
          <Typography variant="h6" component="h6" sx={{ color: "#767876" }}>
            {surName}
          </Typography>
        </Box>
        {variant === "call" && <CallActions />}
      </Box>
    </Box>
  );
  return isLink ? <Link to={`/user/${_id}/${type}`}>{content}</Link> : content;
}
export default Chat;
