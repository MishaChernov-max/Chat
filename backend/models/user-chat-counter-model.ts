import { model, Schema } from "mongoose";

const counterSchema = new Schema({
  roomId: { type: String, required: true },
  userId: { type: String, required: true },
  senderId: { type: String, required: true },
  unreadCount: { type: Number, required: true, default: 0 },
});
counterSchema.index({ roomId: 1, userId: 1, senderId: 1 }, { unique: true });
export default model("counter", counterSchema);
