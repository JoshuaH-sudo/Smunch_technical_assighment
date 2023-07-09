import mongoose, { Schema } from "mongoose";

const product_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    default: [],
  },
});

const Product = mongoose.model("Product", product_schema);

export default Product;
