import {
  EuiFlexItem,
  EuiFlexGroup,
  EuiText,
  EuiCard,
  EuiTitle,
  EuiButton,
} from "@elastic/eui";
import React, { CSSProperties, FC, useState } from "react";
import Comment_display from "../../utils/Comment_display";
import Product_list from "../product/Product_list";
import { Restaurant_data } from "./types";
import Rating_display from "../../utils/Rating_display";
import { useNavigate } from "react-router-dom";
import { edit } from "../../utils/api";
import { New_review } from "../../../../server/models/review";
import Add_review_modal from "../../review/Add_review_modal";

interface Restaurant_card_props {
  restaurant: Restaurant_data;
}

const scroll_section_style: CSSProperties = {
  maxHeight: "300px",
  overflowY: "auto",
  scrollbarWidth: "thin",
};

const Restaurant_card: FC<Restaurant_card_props> = ({ restaurant }) => {
  const navigate = useNavigate();
  const [show_review_modal, set_show_review_modal] = useState(false);
  const { _id, name, image_src, average_rating, reviews, products } =
    restaurant;

  const close_modal = () => {
    set_show_review_modal(false);
  };

  const open_modal = () => {
    set_show_review_modal(true);
  };

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

  const no_reviews = (
    <EuiTitle size="xxs">
      <EuiText textAlign="center">No Reviews Have been Made</EuiText>
    </EuiTitle>
  );
  const description = (
    <EuiFlexGroup direction="column" justifyContent="center">
      <EuiFlexItem grow={false}>
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiTitle size="s">
            <EuiText>Comments</EuiText>
          </EuiTitle>

          <EuiFlexItem grow={false}>
            <EuiButton onClick={open_modal}>Add Review</EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>

      <EuiFlexItem style={scroll_section_style}>
        {reviews.length === 0 ? (
          no_reviews
        ) : (
          <Comment_display comments={reviews} />
        )}
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

  const review_display_card = (
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
    />
  );

  const on_confirm = async (review: New_review) => {
    await edit(`restaurant/${_id}/add_review`, {
      data: review,
    });

    close_modal();
    navigate(0);
  };

  const review_modal = (
    <Add_review_modal
      review_item_type={"Restaurant"}
      close_modal={close_modal}
      on_confirm={on_confirm}
      item_display={review_display_card}
    />
  );

  return (
    <>
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
      {show_review_modal && review_modal}
    </>
  );
};

export default Restaurant_card;
