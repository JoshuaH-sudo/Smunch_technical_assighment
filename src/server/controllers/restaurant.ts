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

  res.send(restaurants);
};
