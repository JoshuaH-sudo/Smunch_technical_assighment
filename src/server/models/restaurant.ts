import mongoose, { Schema } from "mongoose";

const restaurant_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img_src: {
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
  comments: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    default: [],
  },
});

const Restaurant = mongoose.model("Restaurant", restaurant_schema);

const bakery_1 = new Restaurant({
  name: "Berlin Bakery",
  img_src:
    "https://upload.wikimedia.org/wikipedia/commons/7/77/MagasinDandoy.jpg",
});

const bakery_2 = new Restaurant({
  name: "Berlin Bakery 2",
  img_src:
    "https://upload.wikimedia.org/wikipedia/commons/7/77/MagasinDandoy.jpg",
});

const add_default_restaurants = async () => {
  await bakery_1.save();
  await bakery_2.save();
};

add_default_restaurants();

export default Restaurant;
