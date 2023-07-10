import mongoose, { Schema } from "mongoose";
import Review, { Review_info } from "./review";
import moment from "moment";
import Product from "./product";
import { Restaurant_data } from "../../client/components/pages/restaurant/types";
import debug from "debug";

//The some document properties returned from requests will be different to what is stored in the restaurant document
export type Restaurant_document = Restaurant_data & {
  reviews: Schema.Types.ObjectId[];
  products: Schema.Types.ObjectId[];
};

const restaurant_schema = new mongoose.Schema<Restaurant_document>(
  {
    name: {
      type: String,
      required: true,
    },
    image_src: {
      type: String,
      required: true,
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
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const debugLog = debug("app:server:debug");
restaurant_schema
  .virtual("average_rating")
  .get(function () {
    const reviews_list: Review_info[] = this.reviews;
    if (reviews_list.length === 0) {
      return 0;
    }

    debugLog("reviews list");
    debugLog(reviews_list);

    const total_rating = reviews_list.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const average_rating = total_rating / reviews_list.length;
    debugLog("average " + average_rating);
    return average_rating;
  });

const Restaurant = mongoose.model("Restaurant", restaurant_schema);

const add_default_restaurants = async () => {
  if ((await Restaurant.count()) !== 0) return;

  const review_1 = await new Review({
    username: "josh",
    rating: 0,
    title: "NO GF!?",
    comment_text: "Why do you not have gluten free bread",
    timestamp: moment().toString(),
  }).save();

  const review_2 = await new Review({
    username: "josh",
    rating: 5,
    title: "Tasty",
    comment_text: "Bread Good",
    timestamp: moment().toString(),
  }).save();

  const product_1 = await new Product({
    name: "Toasted Bread",
    description: "Bread but toasted",
    image_src:
      "https://upload.wikimedia.org/wikipedia/commons/8/8e/ToastedWhiteBread.jpg",
    average_rating: 5,
    reviews: [review_1._id, review_2._id],
  }).save();

  await new Restaurant({
    name: "Berlin Bakery",
    image_src:
      "https://upload.wikimedia.org/wikipedia/commons/7/77/MagasinDandoy.jpg",
    reviews: [review_1._id],
    products: [product_1._id],
  }).save();

  await new Restaurant({
    name: "Berlin Bakery 2",
    image_src:
      "https://upload.wikimedia.org/wikipedia/commons/7/77/MagasinDandoy.jpg",
  }).save();
};

add_default_restaurants();

export default Restaurant;
