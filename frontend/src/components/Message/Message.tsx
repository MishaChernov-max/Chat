import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import IconMenu from "../ContextMenu/IconMenu";
import { useEffect, useState } from "react";
import ModalUsers from "../ModalUsers/ModalUsers";
import ForwardMessage from "../forwardMessage/forwardMessage";
import EditMessage from "../EditMessage/EditMessage";
import handleClickChatModal from "../../utils/handleClckChatModal";
import formatTime from "../../utils/formatTime";
import type { ChatType } from "../../hooks/useSendMessage";
import FriendMessage from "../FriendMessage/FriendMessage";

export type MessageType = {
  id: string;
  text: string;
  messageId: string;
  photo?: string;
  createdAt?: Date;
  forwardedFrom?: string;
  isEdited?: boolean;
  type?: ChatType;
};

export type ContextMenuType = {
  mouseX: number;
  mouseY: number;
};
function Message(message: MessageType) {
  const { id, text, messageId, createdAt, forwardedFrom, isEdited } = message;
  const dateTime = formatTime(createdAt || "");

  const { isLoading } = useSelector((state: RootState) => state.messageSlice);
  const { user } = useSelector((state: RootState) => state.auth);
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
  const isMyMessage = id === user?._id;
  if (!isMyMessage) {
    return <FriendMessage message={message} />;
  }
  return (
    <>
      {isEditing ? (
        <EditMessage
          message={message}
          isEditing={isEditing}
          SetIsEditing={SetIsEditing}
        />
      ) : (
        <Box
          onContextMenu={handleContextMenu}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            borderRadius: "30px",
            padding: "8px 16px 8px 20px",
            bgcolor: "#312F2F",
            alignSelf: "flex-end",
            marginTop: "15px",
            position: "relative",
            opacity: isLoading ? "0.7" : "1",
            maxWidth: "70%",
            gap: 1,
          }}
        >
          {forwardedFrom && <ForwardMessage forwardedFrom={forwardedFrom} />}
          <ModalUsers
            handleOnClick={handleClickChatModal}
            showFilterTabs={false}
            showModal={showModal}
          />
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

          <Typography
            sx={{
              fontSize: "20px",
              wordBreak: "break-word",
              lineHeight: 1.3,
            }}
          >
            {text}
          </Typography>

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
              <span
                style={{ color: "green", fontSize: "10px", lineHeight: 1.4 }}
              >
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
      )}
    </>
  );
}
export default Message;
