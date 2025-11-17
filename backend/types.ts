export type ChatType = "group" | "chat";

export type MessageType = {
  id: string;
  text: string;
  messageId: string;
  photo?: string;
  createdAt: Date;
  forwardedFrom?: string;
  isEdited?: boolean;
  type: ChatType;
};

export type updatedMessage = {
  text: string;
  messageId: string;
  type: ChatType;
};

export type editMessageType = {
  roomId: string;
  updatedMessage: updatedMessage;
};

export type messagePayloadType = {
  roomId: string;
  message: MessageType;
};

export type userType = {
  _id: string;
  email: string;
  photo?: string;
  isOnline?: boolean;
  name?: string;
  surName?: string;
};

export type messageFilePayloadType = {
  file: File;
  roomId: string;
  id: string;
  text: string;
  messageId: string;
};

export interface MarkAsRead {
  roomId: string;
  userId: string;
}
