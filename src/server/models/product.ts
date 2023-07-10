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

const product_schema = new mongoose.Schema<Product_info>(
  {
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
    reviews: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Review",
        },
      ],
      default: [],
    },
  },
  {
    virtuals: true,
  }
);

// The average_rating is not stored in the DB but its provided / calculated when the documents is retrieved.
product_schema.virtual("average_rating").get(async function () {
  const reviews_list: Review_info[] = (await this.populate("reviews")).reviews;
  if (reviews_list.length === 0) {
    return 0;
  }

  const total_rating = reviews_list.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  const average_rating = total_rating / reviews_list.length;
  return average_rating;
});

const Product = mongoose.model("Product", product_schema);
export default Product;
