import {
  EuiListGroupItem,
  EuiListGroup,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../product/Product_details";
import Rating_display from "./Rating_display";

interface Products_list_props {
  products: Product[];
}

const Products_list: FC<Products_list_props> = ({ products }) => {
  const navigate = useNavigate();

  const list_items = products.map((product) => (
    <EuiListGroupItem
      title="Products"
      key={product.id}
      onClick={() => navigate(`product/${product.id}`)}
      label={<Product_label product={product} />}
    />
  ));

  return (
    <EuiListGroup maxWidth={false} bordered={true}>
      {list_items}
    </EuiListGroup>
  );
};

interface Product_label_props {
  product: Product;
}

const Product_label: FC<Product_label_props> = ({ product }) => {
  const { name, rating } = product;
  return (
    <EuiFlexGroup>
      <EuiFlexItem grow={false}>{name}</EuiFlexItem>
      <EuiFlexItem grow={false}>
        <Rating_display rating={rating} />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default Products_list;
