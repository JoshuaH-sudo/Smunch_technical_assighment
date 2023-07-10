import { NextFunction, Request, Response } from "express";
import Product from "../models/product";

interface get_params {
  product_id: string;
}
export const get_product = async (
  req: Request<get_params>,
  res: Response,
  next: NextFunction
) => {
  const { product_id } = req.params;
  const product = await Product.findById(product_id).populate("reviews");

  res.json(product);
};
