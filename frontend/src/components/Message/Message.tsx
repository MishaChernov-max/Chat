import { Avatar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import IconMenu from "../ContextMenu/IconMenu";
import { useEffect, useState } from "react";
import ModalUsers from "../ModalUsers/ModalUsers";
import ForwardMessage from "../forwardMessage/forwardMessage";
import EditMessage from "../EditMessage/EditMessage";

export type MessageType = {
  id: string;
  text: string;
  messageId: string;
  photo?: string;
  timeStamp?: string;
  forwardedFrom?: string;
  isEdited?: boolean;
};

export type ContextMenuType = {
  mouseX: number;
  mouseY: number;
};
function Message(message: MessageType) {
  const { id, text, photo, messageId, timeStamp, forwardedFrom, isEdited } =
    message;
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
  }, []);
  const isMyMessage = id === user?._id;

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
            flexDirection: forwardedFrom ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "no-wrap",
            borderRadius: "30px",
            padding: "8px 30px",
            bgcolor: "#312F2F",
            alignSelf: !isMyMessage ? "flex-start" : "flex-end",
            marginTop: "15px",
            position: "relative",
            opacity: isLoading ? "0.7" : "1",
          }}
        >
          {forwardedFrom && <ForwardMessage forwardedFrom={forwardedFrom} />}
          <ModalUsers showModal={showModal} />
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
            />
          )}
          {!isMyMessage && (
            <Button href="qa123131">
              <Avatar src={photo} />
            </Button>
          )}
          {timeStamp}
          <Typography
            sx={{
              fontSize: "20px",
              maxWidth: "1600px",
            }}
          >
            {text}
          </Typography>
          {isEdited && (
            <span
              style={{ marginLeft: "10px", color: "green", fontSize: "12px" }}
            >
              Изменено
            </span>
          )}
        </Box>
      )}
    </>
  );
}
export default Message;
