import React from "react";
import { Rating } from "../restaurant/Rating_display";
import { Comment_info } from "../restaurant/Comment_display";
import moment from "moment";
import { useLoaderData } from "react-router-dom";

export interface Product {
  id: string;
  name: string;
  description: string;
  rating: Rating;
  comments?: Comment_info[];
}
export const DUMMY_PRODUCT: Product = {
  id: "1",
  name: "Toasted Bread",
  description: "Name says it all.",
  rating: 3,
  comments: [
    {
      username: "josh",
      timestamp_date: moment().subtract(3, "days").toString(),
      rating: 3,
      title: "What is this?",
      text: "It's just bread",
    },
  ],
};

const Product_details = () => {
  const data = useLoaderData() as Product;
  return <div>{}</div>;
};

export default Product_details;
