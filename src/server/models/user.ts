import mongoose from "mongoose";

export interface User_info {
  _id: string;
  username: string;
  password: string;
}

const user_schema = new mongoose.Schema<User_info>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", user_schema);

export default User;
