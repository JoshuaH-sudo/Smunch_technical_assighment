import {
  EuiListGroupItem,
  EuiListGroup,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import Rating_display from "./Rating_display";
import { Product_info } from "../../../server/models/product";

interface Products_list_props {
  products: Product_info[];
}

const Products_list: FC<Products_list_props> = ({ products }) => {
  const navigate = useNavigate();

  const list_items = products.map((product) => (
    <EuiListGroupItem
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
  product: Product_info;
}

const Product_label: FC<Product_label_props> = ({ product }) => {
  const { name, average_rating } = product;
  return (
    <EuiFlexGroup style={{ maxHeight: "10%" }}>
      <EuiFlexItem grow={false}>{name}</EuiFlexItem>
      <EuiFlexItem grow={false}>
        <Rating_display rating={average_rating} />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default Products_list;
