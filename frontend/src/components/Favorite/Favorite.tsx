import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CallActions from "../CallActions/CallActions";
import type { userType } from "../../api/users";
import { Link } from "react-router-dom";

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
