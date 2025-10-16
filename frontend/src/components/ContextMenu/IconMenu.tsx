import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import useDeleteMessage from "../../hooks/useDeleteMessage";
import type { Dispatch, SetStateAction } from "react";
import type { MessageType } from "../Message/Message";
import useActions from "../../hooks/useActions";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export type IconMenuType = {
  text: string;
  messageId: string;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
  SetIsEditing: Dispatch<SetStateAction<boolean>>;
  message: MessageType;
  forwardedFrom?: string;
};

export default function IconMenu({
  text,
  messageId,
  showModal,
  setShowModal,
  isEditing,
  SetIsEditing,
  message,
  forwardedFrom,
}: IconMenuType) {
  const { user } = useSelector((state: RootState) => state.auth);
  const handleClickEditMessage = () => {
    if (!isEditing) {
      SetIsEditing(true);
    }
  };
  const { setForwardMessage } = useActions();
  const { handleDeleteClick } = useDeleteMessage(messageId);
  const handleForwardMessageClick = () => {
    if (!showModal) {
      setShowModal(true);
      setForwardMessage(message);
    }
  };
  const handleClick = async () => {
    await handleCopy(text);
  };
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.log("error", err);
    }
  };
  return (
    <Paper
      sx={{
        width: 320,
        maxWidth: "100%",
        position: "absolute",
        zIndex: "100",
      }}
    >
      <MenuList>
        <MenuItem onClick={() => handleDeleteClick()}>
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ⌘X
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClick}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ⌘C
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Reply</ListItemText>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ⌘V
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleForwardMessageClick();
          }}
        >
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Forward</ListItemText>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ⌘V
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            if (!forwardedFrom && user?._id === message.id) {
              handleClickEditMessage();
            }
          }}
        >
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
