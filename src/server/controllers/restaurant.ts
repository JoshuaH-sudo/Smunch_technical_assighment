import { NextFunction, Request, Response } from "express";
import Restaurant from "../models/restaurant";

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
