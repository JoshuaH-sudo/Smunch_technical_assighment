import mongoose, { Schema } from "mongoose";
import { Review_info } from "./review";

export type Rating = 0 | 1 | 2 | 3 | 4 | 5;
export interface Product_info {
  _id: string;
  name: string;
  image_src: string;
  description: string;
  average_rating: Rating;
  reviews: Review_info[];
}

const product_schema = new mongoose.Schema<Product_info>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image_src: {
    type: String,
    required: true,
  },
  average_rating: {
    type: Number,
    required: true,
  },
  reviews: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    default: [],
  },
});

const Product = mongoose.model("Product", product_schema);

export default Product;
