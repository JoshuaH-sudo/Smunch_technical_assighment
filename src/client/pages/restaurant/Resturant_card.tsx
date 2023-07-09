import { EuiFlexItem, EuiFlexGroup, EuiText, EuiCard } from "@elastic/eui";
import React, { FC } from "react";
import Comment_display from "./Comment_display";
import Products_list from "./Products_list";
import Rating_display from "./Rating_display";
import { Restaurant } from "./types";

interface Restaurant_card_props {
  restaurant: Restaurant;
}

const Restaurant_card: FC<Restaurant_card_props> = ({ restaurant }) => {
  const { name, image_src, average_rating, comments, products } = restaurant;

  const product_overview_display = (
    <EuiFlexItem grow={false}>
      <Products_list products={products} />
    </EuiFlexItem>
  );
  const description = (
    <EuiFlexGroup direction="column" justifyContent="center">
      <EuiFlexItem>
        <Comment_display limit={1} comments={comments} />
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
