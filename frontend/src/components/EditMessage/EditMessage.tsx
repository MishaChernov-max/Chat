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
          background: "#3964fe",
          color: "#FFFFFF",
        }}
      >
        <Input
          rows={3}
          fullWidth
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
          sx={{ justifyContent: "flex-end", alignItems: "center" }}
        >
          <Button
            onClick={() => {
              handleClickClose();
            }}
            sx={{ background: "black", borderRadius: "30px", width: "20px" }}
          >
            Close
          </Button>
          <Button
            type="submit"
            sx={{ background: "white", borderRadius: "30px", width: "20px" }}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
}
export default EditMessage;
