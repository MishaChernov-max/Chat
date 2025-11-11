import type { MessageType } from "../Message/Message";
import Message from "../Message/Message";

export type MessagesType = {
  messages: MessageType[];
};
function Messages({ messages }: MessagesType) {
  return (
    <>
      {messages.map((message) => (
        <Message {...message} />
      ))}
    </>
  );
}
export default Messages;
