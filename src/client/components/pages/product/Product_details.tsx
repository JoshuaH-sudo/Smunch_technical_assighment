import {
  EuiFlexItem,
  EuiFlexGroup,
  EuiText,
  EuiCard,
  EuiPageBody,
  EuiPage,
  EuiPageSection,
} from "@elastic/eui";
import React, { FC } from "react";
import { Product_info } from "../../../../server/models/product";
import Rating_display from "../../Rating_display";
import Comment_display from "../../utils/Comment_display";
import { useLoaderData } from "react-router-dom";

const Product_details: FC = () => {
  const product = useLoaderData() as Product_info;
  const { name, image_src, description, average_rating, reviews } = product;

  const description_display = (
    <EuiFlexGroup direction="column" justifyContent="center">
      <EuiFlexItem>
        <EuiText>{description}</EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <Comment_display comments={reviews} />
      </EuiFlexItem>
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

  const product_card = (
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
      description={description_display}
    />
  );

  return (
    <EuiPageSection restrictWidth="80%" grow={true}>
      {product_card}
    </EuiPageSection>
  );
};

export default Product_details;
