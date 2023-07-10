import {
  EuiFlexItem,
  EuiFlexGroup,
  EuiText,
  EuiCard,
  EuiTitle,
} from "@elastic/eui";
import React, { CSSProperties, FC } from "react";
import Comment_display from "../../utils/Comment_display";
import Product_list from "../product/Product_list";
import Rating_display from "../../Rating_display";
import { Restaurant_data } from "./types";

interface Restaurant_card_props {
  restaurant: Restaurant_data;
}

const scroll_section_style: CSSProperties = {
  maxHeight: "300px",
  overflowY: "auto",
  scrollbarWidth: "thin",
};

const Restaurant_card: FC<Restaurant_card_props> = ({ restaurant }) => {
  const { name, image_src, average_rating, reviews, products } = restaurant;

  const product_overview_display = (
    <EuiFlexItem>
      <EuiFlexGroup direction="column" justifyContent="center">
        <EuiFlexItem grow={false}>
          <EuiTitle size="s">
            <EuiText>Products</EuiText>
          </EuiTitle>
        </EuiFlexItem>

        <EuiFlexItem grow={false} style={scroll_section_style}>
          <Product_list products={products} />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlexItem>
  );
  const description = (
    <EuiFlexGroup direction="column" justifyContent="center">
      <EuiFlexItem grow={false}>
        <EuiTitle size="s">
          <EuiText>Comments</EuiText>
        </EuiTitle>
      </EuiFlexItem>

      <EuiFlexItem style={scroll_section_style}>
        <Comment_display comments={reviews} />
      </EuiFlexItem>

      {products.length > 0 && product_overview_display}
    </EuiFlexGroup>
  );

  const name_display = (
    <EuiFlexGroup justifyContent="center" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiText>{name}</EuiText>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <Rating_display rating={average_rating} />
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  return (
    <EuiCard
      paddingSize="m"
      textAlign="left"
      image={
        <EuiFlexGroup justifyContent="center" alignItems="center">
          <EuiFlexItem grow={false}>
            <img
              style={{
                width: "25rem",
                height: "25rem",
              }}
              src={image_src}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      }
      title={name_display}
      description={description}
    />
  );
};

export default Restaurant_card;
