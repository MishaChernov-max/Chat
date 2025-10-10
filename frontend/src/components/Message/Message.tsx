import { Avatar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export type MessageType = {
  id: string;
  text: string;
  photo?: string;
};
function Message({ id, text, photo }: MessageType) {
  const { user } = useSelector((state: RootState) => state.auth);

  const isMyMessage = id === user?._id;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "no-wrap",
          borderRadius: "30px",
          padding: "8px 30px",
          bgcolor: "#312F2F",
          alignSelf: !isMyMessage ? "flex-start" : "flex-end",
          marginTop: "15px",
        }}
      >
        {!isMyMessage && (
          <Button href="qa123131">
            <Avatar src={photo} />
          </Button>
        )}
        <Typography
          sx={{
            fontSize: "20px",
            maxWidth: "1600px",
          }}
        >
          {text}
        </Typography>
      </Box>
    </>
  );
}
export default Message;
