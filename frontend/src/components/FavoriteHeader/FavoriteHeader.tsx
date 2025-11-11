import Box from "@mui/material/Box";
import ProfilePhoto from "../../assets/ProfilePhoto.svg";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CallActions from "../CallActions/CallActions";
import { Typography } from "@mui/material";

export type ChatHeaderType = {
  id: string;
};
function FavoriteHeader() {
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
              alt="FavoritePhoto"
              sx={{ width: "80px", height: "80px", background: "#1c9768ff" }}
            >
              <BookmarkIcon sx={{ width: "40px", height: "40px" }} />
            </Avatar>
            <Typography
              variant="h5"
              component="h5"
              sx={{
                marginLeft: "30px",
                color: "#FFFFFF",
                textTransform: "none",
              }}
            >
              Saved Messages
            </Typography>
          </Button>
        </Stack>
        <Stack>
          <CallActions />
        </Stack>
      </Box>
    </>
  );
}
export default FavoriteHeader;
