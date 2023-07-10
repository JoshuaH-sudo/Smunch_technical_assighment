import mongoose, { Schema } from "mongoose";
import { Review_info } from "./review";
import Product, { Product_info, Rating } from "./product";

//The same document properties returned from requests will be different to what is stored in the restaurant document
export type Restaurant_document = Restaurant_data & {
  reviews: Schema.Types.ObjectId[];
  products: Schema.Types.ObjectId[];
};

export interface Restaurant_data {
  _id: string;
  name: string;
  image_src: string;
  average_rating: Rating;
  reviews: Review_info[];
  products: Product_info[];
}

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

/**
 * Assumes that reviews will be populated.
 * The average_rating is not stored in the DB but its provided / calculated when the documents is retrieved.
 */
restaurant_schema.virtual("average_rating").get(function () {
  const reviews_list: Review_info[] = this.reviews;
  if (reviews_list.length === 0) {
    return 0;
  }

  const total_rating = reviews_list.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  const average_rating = total_rating / reviews_list.length;

  return Math.round(average_rating);
});

const Restaurant = mongoose.model("Restaurant", restaurant_schema);

// Basic defaults for demonstration
const add_defaults = async () => {
  if ((await Restaurant.count()) !== 0) return;

  const bread = await new Product({
    name: "Toasted Bread",
    description: "Bread but toasted",
    image_src:
      "https://upload.wikimedia.org/wikipedia/commons/8/8e/ToastedWhiteBread.jpg",
  }).save();

  const sandwich = await new Product({
    name: "Sandwich",
    description: "delicious",
    image_src:
      "https://upload.wikimedia.org/wikipedia/commons/2/24/Bologna_sandwich.jpg",
  }).save();

  await new Restaurant({
    name: "Berlin Bakery",
    image_src:
      "https://upload.wikimedia.org/wikipedia/commons/7/77/MagasinDandoy.jpg",
    products: [bread._id, sandwich._id],
  }).save();

  const fried_rice = await new Product({
    name: "Fried Rice",
    description: "The best dish",
    image_src:
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Koh_Mak%2C_Thailand%2C_Fried_rice_with_seafood%2C_Thai_fried_rice.jpg",
  }).save();

  const green_curry = await new Product({
    name: "Green Curry",
    description: "hot soupy",
    image_src:
      "https://upload.wikimedia.org/wikipedia/commons/e/e5/Thai_green_chicken_curry_and_roti.jpg",
  }).save();

  await new Restaurant({
    name: "Thai 4 You",
    image_src:
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/Yam_wun_sen.JPG",
    products: [fried_rice._id, green_curry._id],
  }).save();
};

add_defaults();

export default Restaurant;
