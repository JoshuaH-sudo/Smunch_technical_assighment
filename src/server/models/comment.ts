import mongoose from "mongoose";

const comment_schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", comment_schema);

export default Comment;
