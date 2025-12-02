import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Delete from "@mui/icons-material/Delete";
import Share from "@mui/icons-material/Forward";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopy from "@mui/icons-material/ContentCopy";
import RedoIcon from "@mui/icons-material/Redo";
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
  contextMenu: { mouseX: number; mouseY: number } | null;
};

export default function IconMenu({
  text,
  messageId,
  setShowModal,
  isEditing,
  SetIsEditing,
  message,
  forwardedFrom,
  contextMenu,
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
    setShowModal(true);
    setForwardMessage(message);
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

  const paperStyles = {
    width: 320,
    maxWidth: "100%",
    boxShadow: 3,
    zIndex: 9999,
    ...(contextMenu
      ? {
          position: "fixed" as const,
          top: contextMenu.mouseY - 170,
          left: contextMenu.mouseX - 170,
        }
      : {
          display: "none",
        }),
  };

  return (
    <Paper sx={paperStyles}>
      <MenuList>
        <MenuItem onClick={handleClick}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleForwardMessageClick();
          }}
        >
          <RedoIcon>
            <Share fontSize="small" />
          </RedoIcon>
          <ListItemText>Forward</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (!forwardedFrom && user?._id === message._id) {
              handleClickEditMessage();
            }
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
