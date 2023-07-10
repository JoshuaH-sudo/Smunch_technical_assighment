import { NextFunction, Request, Response } from "express";
import Restaurant from "../models/restaurant";
import Review, { New_review } from "../models/review";

export const get_restaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const restaurants = await Restaurant.find()
    .populate("reviews")
    .populate("products");

  //Need to convert the document to json to have the virtual fields returned to client
  const parsed_restaurants = restaurants.map((document) => {
    return document.toJSON();
  });

  res.json(parsed_restaurants);
};

interface Add_review_params {
  restaurant_id: string;
}

interface Add_review_body {
  data: New_review;
}
export const add_review = async (
  req: Request<Add_review_params, Add_review_body>,
  res: Response,
  next: NextFunction
) => {
  const new_review = await new Review(req.body.data).save();
  const edit_product = await Restaurant.findById(req.params.restaurant_id);

  if (!edit_product) {
    return res.status(404).send({ message: "Product not found" });
  }

  edit_product.reviews.push(new_review);
  const updated_product = await (await edit_product.save()).populate("reviews");

  return res.status(200).send(updated_product);
};
