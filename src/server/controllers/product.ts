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

  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }

  //Need to convert the document to json to have the virtual fields returned to client
  res.json(product.toJSON());
};

interface Add_review_params {
  product_id: string;
}

interface Add_review_body extends Omit<Review_info, "timestamp"> {}

export const add_review = async (
  req: Request<Add_review_params, Add_review_body>,
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
