import {
  EuiFlexItem,
  EuiFlexGroup,
  EuiText,
  EuiCard,
  EuiPageBody,
  EuiPage,
  EuiPageSection,
  EuiButton,
} from "@elastic/eui";
import React, { FC, useState } from "react";
import { Product_info } from "../../../../server/models/product";
import Comment_display from "../../utils/Comment_display";
import { useLoaderData, useNavigate } from "react-router-dom";
import Rating_display from "../../utils/Rating_display";
import Add_review_modal from "../../review/Add_review_modal";
import { New_review, Review_info } from "../../../../server/models/review";
import { edit } from "../../utils/api";
import Review_display from "../../utils/Review_display";

/**
 * Display the products details such as reviews.
 */
const Product_details: FC = () => {
  const product = useLoaderData() as Product_info;
  const navigate = useNavigate();

  const [show_review_modal, set_show_review_modal] = useState(false);
  const { name, image_src, description, average_rating, reviews } = product;

  const close_modal = () => {
    set_show_review_modal(false);
  };

  const open_modal = () => {
    set_show_review_modal(true);
  };

  const description_display = (
    <EuiFlexGroup direction="column" justifyContent="center">
      <EuiFlexItem>
        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem>
            <EuiText>{description}</EuiText>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiButton onClick={open_modal}>Add Review</EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
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

  const on_confirm = async (review: New_review) => {
    await edit(`product/${product._id}/add_review`, {
      data: review,
    });

    close_modal();
    navigate(0);
  };

  const review_modal = (
    <Add_review_modal
      review_item_type={"Product"}
      close_modal={close_modal}
      on_confirm={on_confirm}
      item_display={
        <Review_display image_src={image_src} title={name_display} />
      }
    />
  );
  return (
    <EuiPageSection restrictWidth="80%" grow={true}>
      {product_card}
      {show_review_modal && review_modal}
    </EuiPageSection>
  );
};

export default Product_details;
