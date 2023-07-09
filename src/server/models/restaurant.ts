import mongoose, { Schema } from "mongoose";
import Review from "./review";
import moment from "moment";
import Product from "./product";
import { Restaurant_data } from "../../client/pages/restaurant/types";

//The some document properties returned from requests will be different to what is stored in the restaurant document
export type Restaurant_document = Restaurant_data & {
  reviews: Schema.Types.ObjectId[];
  products: Schema.Types.ObjectId[];
};

const restaurant_schema = new mongoose.Schema<Restaurant_document>({
  name: {
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
    default: 0,
  },
  products: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    default: [],
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

const Restaurant = mongoose.model("Restaurant", restaurant_schema);

const add_default_restaurants = async () => {
  const review_1 = await new Review({
    username: "josh",
    rating: 0,
    title: "NO GF!?",
    comment_text: "Why do you not have gluten free bread",
    timestamp: moment().toString(),
  }).save();

  const product_1 = await new Product({
    name: "Toasted Bread",
    description: "Bread but toasted",
    average_rating: 5,
    comments: [review_1._id],
  }).save();

  const bakery_1 = new Restaurant({
    name: "Berlin Bakery",
    image_src:
      "https://upload.wikimedia.org/wikipedia/commons/7/77/MagasinDandoy.jpg",
    reviews: [review_1._id],
    products: [product_1._id],
  });

  const bakery_2 = new Restaurant({
    name: "Berlin Bakery 2",
    image_src:
      "https://upload.wikimedia.org/wikipedia/commons/7/77/MagasinDandoy.jpg",
  });

  await Restaurant.deleteMany();
  await bakery_1.save();
  await bakery_2.save();
};

add_default_restaurants();

export default Restaurant;
