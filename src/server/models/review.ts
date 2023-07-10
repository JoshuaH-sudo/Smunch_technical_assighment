import mongoose from "mongoose";
import { Rating } from "./product";
import { get } from "http";

export interface Review_info {
  rating: Rating;
  title: string;
  comment_text: string;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

export interface New_review
  extends Omit<Review_info, "timestamp" | "createdAt" | "updatedAt"> {}

const review_schema = new mongoose.Schema<Review_info>(
  {
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

review_schema.virtual("timestamp").get(function () {
  return this.createdAt;
});

const Review = mongoose.model("Review", review_schema);

export default Review;
