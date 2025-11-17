import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    forwardedFrom: String,
    isEdited: Boolean,
  },
  { versionKey: false, timestamps: true }
);
export default model("Message", messageSchema);
