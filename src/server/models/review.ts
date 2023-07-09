import mongoose from "mongoose";
import { EuiCommentProps } from "@elastic/eui";
import { Rating } from "./product";

export interface Review_info extends EuiCommentProps {
  rating: Rating;
  title: string;
  comment_text: string;
  timestamp_date: string;
}

const review_schema = new mongoose.Schema<Review_info>({
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
  comment_text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", review_schema);

export default Review;
