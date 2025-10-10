import Message, { type MessageType } from "../Message/Message";

export type MessagesType = {
  messages: MessageType[];
};
function Messages({ messages }: MessagesType) {
  return (
    <>
      {messages.map((m) => (
        <Message {...m} key={m.id} />
      ))}
    </>
  );
}
export default Messages;
