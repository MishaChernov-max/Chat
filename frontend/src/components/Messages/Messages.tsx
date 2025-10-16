import Stack from "@mui/material/Stack";
import Message, { type MessageType } from "../Message/Message";

export type MessagesType = {
  messages: MessageType[];
};
function Messages({ messages }: MessagesType) {
  return (
    <>
      <Stack>
        {messages.map((m) => (
          <Message {...m} key={m?.id} />
        ))}
      </Stack>
    </>
  );
}
export default Messages;
