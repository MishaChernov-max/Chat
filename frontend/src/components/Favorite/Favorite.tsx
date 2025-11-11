import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CallActions from "../CallActions/CallActions";
import type { userType } from "../../api/users";
import { Link } from "react-router-dom";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export type FavoritePropsType = {
  userr: userType;
  variant?: string;
  handleOnClick?: Function;
  isLink?: boolean;
};
function Favorite({
  userr,
  variant,
  handleOnClick,
  isLink = true,
}: FavoritePropsType) {
  const type = "chat";
  const { handleClick } = handleOnClick
    ? handleOnClick()
    : { handleClick: () => {} };
  const { _id } = userr;
  const { chatCache, chatsOverview } = useSelector(
    (state: RootState) => state.users
  );
  const unreadInfo = chatsOverview.find((counter) => counter.senderId === _id);
  console.log("unreadInfo", unreadInfo);
  const unreadCount = chatCache.byUserId[_id]?.chat?.unreadCount || 0;
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
            alt="FavoritePhoto"
            sx={{ width: "80px", height: "80px", background: "#1c9768ff" }}
          >
            <BookmarkIcon sx={{ width: "40px", height: "40px" }} />
          </Avatar>
        </Badge>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6" component="h6" sx={{ color: "#767876" }}>
            Избранное
          </Typography>
        </Box>
        {variant === "call" && <CallActions />}
      </Box>
    </Box>
  );
  return isLink ? <Link to={`/user/${_id}/${type}`}>{content}</Link> : content;
}
export default Favorite;
