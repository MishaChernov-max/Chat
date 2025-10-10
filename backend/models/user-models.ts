import { model, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationLink: {
    type: String,
  },
  name: {
    type: String,
  },
  surName: {
    type: String,
  },
  registrationCompleted: {
    type: Boolean,
    default: false,
  },
});
export default model("User", userSchema);
