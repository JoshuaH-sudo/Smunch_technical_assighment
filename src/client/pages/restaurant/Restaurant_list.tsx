import { EuiFlexGroup, EuiFlexItem, EuiPageSection } from "@elastic/eui";
import React, { FC } from "react";
import moment from "moment";
import { DUMMY_PRODUCT } from "../product/Product_details";
import { Restaurant } from "./types";
import Restaurant_card from "./Resturant_card";

const Restaurant_list: FC = () => {
  const DUMMY_DATA: Restaurant[] = [
    {
      id: "1",
      name: "Cool Bakery",
      image_src:
        "https://upload.wikimedia.org/wikipedia/commons/7/77/MagasinDandoy.jpg",
      average_rating: 3,
      comments: [
        {
          username: "bread_man",
          timestamp_date: moment().subtract(3, "days").toString(),
          rating: 3,
          title: "BREAD!",
          text: "BREAD BREAD",
        },
      ],
      products: [DUMMY_PRODUCT, DUMMY_PRODUCT, DUMMY_PRODUCT],
    },
    {
      id: "2",
      name: "Cool Bakery",
      image_src:
        "https://upload.wikimedia.org/wikipedia/commons/7/77/MagasinDandoy.jpg",
      average_rating: 0,
      comments: [
        {
          username: "josh",
          rating: 0,
          timestamp_date: moment().subtract(1, "day").toString(),
          title: "I want to speak with the manager",
          text: "Where is the gluten free food!?",
        },
      ],
      products: [DUMMY_PRODUCT],
    },
  ];

  const list = DUMMY_DATA.map((restaurant) => (
    <EuiFlexItem key={restaurant.id} grow={false}>
      <Restaurant_card restaurant={restaurant} />
    </EuiFlexItem>
  ));
  return (
    <EuiPageSection grow={true}>
      <EuiFlexGroup>{list}</EuiFlexGroup>
    </EuiPageSection>
  );
};

export default Restaurant_list;
