import {
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPageSection,
  EuiText,
} from "@elastic/eui";
import React, { FC } from "react";
import Rating_display, { Rating } from "./Rating_display";
import Comment_display, { Comment_info } from "./Comment_display";
import moment from "moment";
import { Link, useHref, useNavigate } from "react-router-dom";

interface Restaurant {
  id: string;
  name: string;
  image_src: string;
  average_rating: Rating;
  comments: Comment_info[];
}

const Restaurant_list: FC = () => {
  const DUMMY_DATA: Restaurant[] = [
    {
      id: "1",
      name: "Cool Bakery",
      image_src:
        "https://upload.wikimedia.org/wikipedia/commons/7/77/MagasinDandoy.jpg",
      average_rating: 4,
      comments: [
        {
          username: "josh",
          timestamp_date: moment().subtract(3, "days").toString(),
          rating: 0,
          title: "I want to speak with the manager",
          text: "Where is the gluten free food!?",
        },
      ],
    },
    {
      id: "2",
      name: "Cool Bakery",
      image_src:
        "https://upload.wikimedia.org/wikipedia/commons/7/77/MagasinDandoy.jpg",
      average_rating: 4,
      comments: [
        {
          username: "josh",
          rating: 0,
          timestamp_date: moment().subtract(1, "day").toString(),
          title: "I want to speak with the manager",
          text: "Where is the gluten free food!?",
        },
      ],
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

interface Restaurant_card_props {
  restaurant: Restaurant;
}
const Restaurant_card: FC<Restaurant_card_props> = ({ restaurant }) => {
  const { name, image_src, average_rating, comments } = restaurant;
  const navigate = useNavigate();

  const description = (
    <EuiFlexGroup direction="column" justifyContent="center">
      <EuiFlexItem grow={false}>
        <Rating_display rating={average_rating} />
      </EuiFlexItem>

      <EuiFlexItem>
        <Comment_display limit={1} comments={comments} />
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  const name_display = (
    <EuiFlexGroup justifyContent="center" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiText>{name}</EuiText>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiIcon size="m" type="popout" onClick={() => navigate("product/1")} />
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
                width: "200px",
                height: "200px",
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

export default Restaurant_list;
