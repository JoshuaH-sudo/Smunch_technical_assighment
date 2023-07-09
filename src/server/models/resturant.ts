import mongoose, { Schema } from "mongoose";

const product_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img_src: {
    type: String,
    required: true,
  },
  products: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    default: [],
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    default: [],
  },
});

const Product = mongoose.model("Product", product_schema);

export default Product;
