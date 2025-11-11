import { Avatar, Box, Stack, Typography } from "@mui/material";
import type { ContextMenuType, MessageType } from "../Message/Message";
import { useEffect, useState } from "react";
import ModalUsers from "../ModalUsers/ModalUsers";
import handleClickChatModal from "../../utils/handleClckChatModal";
import IconMenu from "../ContextMenu/IconMenu";
import formatTime from "../../utils/formatTime";

export type FriendMessageType = {
  message: MessageType;
};
function FriendMessage({ message }: FriendMessageType) {
  const { id, text, photo, messageId, createdAt, forwardedFrom, isEdited } =
    message;
  const dateTime = formatTime(createdAt || "");
  const [contextMenu, setContextMenu] = useState<ContextMenuType | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, SetIsEditing] = useState<boolean>(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
  };

  useEffect(() => {
    const handleClick = () => {
      setContextMenu(null);
      setShowModal(false);
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [id]);

  return (
    <Stack
      direction="row"
      alignItems="flex-end"
      gap={1.5}
      sx={{ width: "100%" }}
    >
      <Avatar src={photo} />

      <Box
        onContextMenu={handleContextMenu}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          gap: 1,
          borderRadius: "30px",
          padding: "8px 20px 8px 20px",
          bgcolor: "#312F2F",
          position: "relative",
          maxWidth: "70%",
          marginTop: "15px",
        }}
      >
        {contextMenu && (
          <IconMenu
            text={text}
            messageId={messageId}
            showModal={showModal}
            setShowModal={setShowModal}
            isEditing={isEditing}
            SetIsEditing={SetIsEditing}
            message={message}
            forwardedFrom={forwardedFrom}
            contextMenu={contextMenu}
          />
        )}
        <ModalUsers
          handleOnClick={handleClickChatModal}
          showFilterTabs={false}
          showModal={showModal}
        />

        {/* Текст сообщения */}
        <Typography
          sx={{ fontSize: "20px", wordBreak: "break-word", lineHeight: 1.3 }}
        >
          {text}
        </Typography>

        {/* Время и статус редактирования */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            minWidth: "fit-content",
            marginBottom: "1px",
          }}
        >
          {isEdited && (
            <span style={{ color: "green", fontSize: "10px", lineHeight: 1.4 }}>
              Изменено
            </span>
          )}
          <span
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "12px",
              lineHeight: 1,
            }}
          >
            {dateTime}
          </span>
        </Box>
      </Box>
    </Stack>
  );
}
export default FriendMessage;
