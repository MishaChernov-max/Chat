import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Input, Typography } from "@mui/material";
import { useSendMessage } from "../../hooks/useSendMessage";
import { useSocket } from "../../context/SocketContext";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useParams } from "react-router-dom";
import FileAttachment from "../FileAttachment/FileAttachment";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export type InputFieldType = {
  showEmoji: boolean;
  setShowEmoji: Dispatch<SetStateAction<boolean>>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

function InputField({
  showEmoji,
  setShowEmoji,
  value,
  setValue,
}: InputFieldType) {
  const handleClickEmoji = () => {
    EmojiClick();
  };
  const EmojiClick = () => {
    if (!showEmoji) {
      setShowEmoji(true);
    } else {
      setShowEmoji(false);
    }
  };
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const handleFileSelect = (file: File) => {
    setAttachedFile(file);
  };

  const removeFile = () => {
    setAttachedFile(null);
  };
  const { id } = useParams();
  const socket = useSocket();
  const typingTimerRef = useRef<number | null>(null);
  const typingRef = useRef(false);
  // const handleChange = () => {
  //   clearTimeout(typingTimerRef.current || 0);
  //   if (type === "chat") {
  //     if (!typingRef.current) {
  //       socket?.emit("typing-start:direct", { roomId, userId });
  //       console.log("Отправляю печатает", { roomId, userId });
  //       typingRef.current = true;
  //     }
  //     typingTimerRef.current = setTimeout(() => {
  //       socket?.emit("typing-stop:direct", { roomId, userId });
  //       typingRef.current = false;
  //     }, 3000);
  //   }
  // if (type === "group") {
  //   if (!typingRef.current) {
  //     socket?.emit("typing-start:group", { roomId, userId });
  //     console.log("roomId, userId", { roomId, userId });
  //     typingRef.current = true;
  //   }
  //   typingTimerRef.current = setTimeout(() => {
  //     socket?.emit("typing-stop:group", { roomId, userId });
  //     typingRef.current = false;
  //   }, 3000);
  // }
  // };
  const { sendMessage, roomId, userId, sendFileMessage } = useSendMessage();
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
          <IconButton onClick={handleClickEmoji}>
            <SentimentSatisfiedAltIcon
              sx={{ fill: "white", width: "40px", height: "40px" }}
            />
          </IconButton>
          <form
            style={{ width: "100%" }}
            onSubmit={(e) => {
              e.preventDefault();
              console.log("socket", socket);
              console.log("submit сработал");
              sendMessage(value);
              setValue("");
            }}
          >
            {attachedFile && (
              <Box
                sx={{
                  width: "250px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                  bgcolor: "grey.800",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "grey.700",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    flex: 1,
                    color: "white",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {attachedFile.name} ({(attachedFile.size / 1024).toFixed(1)}{" "}
                  KB)
                </Typography>
                <IconButton
                  size="small"
                  onClick={removeFile}
                  sx={{ color: "white" }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
            <Input
              value={value}
              sx={{ width: "100%", color: "#FFFFFF" }}
              disableUnderline
              placeholder="Message..."
              onChange={(e) => {
                setValue(e.target.value);
                // handleChange();
              }}
            />
          </form>
        </Stack>
        <Stack direction="row">
          <FileAttachment onFileSelect={handleFileSelect} />

          {value ? (
            <IconButton
              onClick={() => {
                sendMessage(value);
                setValue("");
              }}
            >
              <SendIcon sx={{ fill: "white", width: "40px", height: "40px" }} />
            </IconButton>
          ) : (
            <IconButton>
              <CameraAltIcon
                sx={{ fill: "white", width: "40px", height: "40px" }}
              />
            </IconButton>
          )}
        </Stack>
      </Box>
    </>
  );
}
export default InputField;
