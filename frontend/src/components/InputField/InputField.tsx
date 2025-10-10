import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PaymentsIcon from "@mui/icons-material/Payments";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Input } from "@mui/material";
import { useSendMessage } from "../../hooks/useSendMessage";
import { useState } from "react";
import { useSocket } from "../../store/context/SocketContext";

function InputField() {
  const socket = useSocket();
  let typingTimer: number;
  let isTyping = false;
  const handleChange = () => {
    clearTimeout(typingTimer);
    if (!isTyping) {
      socket?.emit("typing-start", { roomId, userId });
      isTyping = true;
    }
    typingTimer = setTimeout(() => {
      socket?.emit("typing-stop", { roomId, userId });
      isTyping = false;
    }, 3000);
  };

  const [value, setValue] = useState<string>("");
  const { sendMessage, roomId, userId } = useSendMessage();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: "#FFFFFF",
          background: "#312F2F",
          maxWidth: "100%",
          borderRadius: "30px",
          marginBottom: "14px",
          padding: "12px 28px 11px 12px",
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center", flex: 1 }}>
          <IconButton>
            <SentimentSatisfiedAltIcon
              sx={{ fill: "white", width: "40px", height: "40px" }}
            />
          </IconButton>
          <form
            style={{ width: "100%" }}
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(value);
              setValue("");
            }}
          >
            <Input
              value={value}
              sx={{ width: "100%", color: "#FFFFFF" }}
              disableUnderline
              placeholder="Message..."
              onChange={(e) => {
                setValue(e.target.value);
                handleChange();
              }}
            />
          </form>
        </Stack>
        <Stack direction="row">
          <IconButton>
            <AttachFileIcon
              sx={{ fill: "white", width: "40px", height: "40px" }}
            />
          </IconButton>
          <IconButton>
            <PaymentsIcon
              sx={{ fill: "white", width: "40px", height: "40px" }}
            />
          </IconButton>
          <IconButton>
            <CameraAltIcon
              sx={{ fill: "white", width: "40px", height: "40px" }}
            />
          </IconButton>
        </Stack>
      </Box>
    </>
  );
}
export default InputField;
