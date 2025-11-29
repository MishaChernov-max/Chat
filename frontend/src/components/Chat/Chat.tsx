import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import type { ChatType } from "../../store/slices/chatsSlice";
import { Avatar } from "@mui/material";
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
  const { _id, name, avatar } = chat;
  const isActive = roomId === _id;
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
          bgcolor: (theme) =>
            isActive
              ? theme.palette.mode === "dark"
                ? "#7A5AF8"
                : "#14532d"
              : theme.palette.mode === "dark"
              ? "#3b3a3aff"
              : "#3b3a3aff",
          marginTop: "20px",
          cursor: "pointer",
          color: (theme) =>
            isActive
              ? theme.palette.primary.contrastText
              : theme.palette.text.primary,
          transition: "background-color 0.2s",
        }}
      >
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
          <Typography variant="h6" component="h6" sx={{ color: "#FFFFFF" }}>
            {name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
  return isLink ? <Link to={`/chat/${_id}`}>{content}</Link> : content;
}
export default Chat;
