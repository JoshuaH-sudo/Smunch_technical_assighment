import { NextFunction, Request, Response } from "express";
import Product from "../models/product";
import Review, { Review_info } from "../models/review";

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

interface Add_review_params {
  product_id: string;
}

export const add_review = async (
  req: Request<Add_review_params, Review_info>,
  res: Response,
  next: NextFunction
) => {
  const new_review = await new Review(req.body).save();
  const edit_product = await Product.findById(req.params.product_id);

  if (!edit_product) {
    return res.status(404).send({ message: "Product not found" });
  }

  edit_product.reviews.push(new_review);
  const updated_product = await edit_product.save();

  return res.status(200).send(updated_product);
};
