import { Button, Input, Stack } from "@mui/material";
import { useState, type Dispatch, type SetStateAction } from "react";
import useEditMessage from "../../hooks/useEditMessage";
import type { MessageType } from "../Message/Message";

export type EditMessageType = {
  message: MessageType;
  isEditing: boolean;
  SetIsEditing: Dispatch<SetStateAction<boolean>>;
};

function EditMessage({ message, isEditing, SetIsEditing }: EditMessageType) {
  const { editMessage } = useEditMessage();
  const handleClickClose = () => {
    if (isEditing) {
      SetIsEditing(false);
    }
  };
  const [editText, setEditText] = useState<string>(message.text);
  const InputStyle = {
    width: "100%",
    height: "160px",
    padding: "8px 30px",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    maxWidth: "100%",
    color: "#FFFFFF",
  };
  return (
    <>
      <form
        onSubmit={() => {
          editMessage(editText, message.messageId);
          handleClickClose();
        }}
        style={{
          marginTop: "15px",
          alignSelf: "flex-end",
          width: "600px",
          borderRadius: "30px",
          background: "#1F1D1D",
        }}
      >
        <Input
          rows={3}
          fullWidth
          disableUnderline
          type="text"
          value={editText}
          onChange={(e) => {
            setEditText(e.target.value);
          }}
          multiline
          autoFocus
          sx={InputStyle}
        />
        <Stack
          direction="row"
          gap={1}
          sx={{ justifyContent: "flex-end", alignItems: "center", mr: 2 }}
        >
          <Button
            onClick={() => {
              handleClickClose();
            }}
            sx={{ borderRadius: "30px", width: "20px", color: "#ffffffc5" }}
          >
            Close
          </Button>
          <Button
            type="submit"
            sx={{ borderRadius: "30px", width: "20px", color: "#ffffffc5" }}
          >
            Ok
          </Button>
        </Stack>
      </form>
    </>
  );
}
export default EditMessage;
