import React from "react";
import { useLoaderData } from "react-router-dom";
import { Product_info } from "../../../server/models/product";

const Product_details = () => {
  const data = useLoaderData() as Product_info;

  return <div>{JSON.stringify(data)}</div>;
};

export default Product_details;
