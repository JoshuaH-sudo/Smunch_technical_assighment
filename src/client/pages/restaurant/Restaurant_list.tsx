import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPageSection,
  EuiPanel,
  EuiText,
  EuiTitle,
} from "@elastic/eui";
import React, { FC } from "react";

interface Comment {
  username: string;
  rating: Rating;
  comment: string;
}

interface Restaurant {
  id: string;
  name: string;
  image_src: string;
  rating: Rating;
  comments: Comment[];
}

const Restaurant_list: FC = () => {
  const DUMMY_DATA: Restaurant[] = [
    {
      id: "1",
      name: "Cool Bakery",
      image_src:
        "https://upload.wikimedia.org/wikipedia/commons/7/77/MagasinDandoy.jpg",
      rating: 4,
      comments: [
        {
          username: "josh",
          rating: 0,
          comment: "Where is the gluten free food!?",
        },
      ],
    },
  ];

  const list = DUMMY_DATA.map((restaurant) => (
    <EuiPanel>
      <Restaurant_card restaurant={restaurant} />
    </EuiPanel>
  ));
  return <EuiPageSection>{list}</EuiPageSection>;
};

interface Restaurant_card_props {
  restaurant: Restaurant;
}
const Restaurant_card: FC<Restaurant_card_props> = ({ restaurant }) => {
  const { name, image_src, rating, comments } = restaurant;
  return (
    <>
      <EuiTitle>
        <EuiText>{name}</EuiText>
      </EuiTitle>
      <Rating_display rating={rating} />
      <img style={{ width: "200px", height: "200px" }} src={image_src} />
    </>
  );
};

type Rating = 0 | 1 | 2 | 3 | 4 | 5;

interface Rating_display_props {
  rating: Rating;
}
const filled_star = (
  <EuiFlexItem grow={false}>
    <EuiIcon type="starFilled" />
  </EuiFlexItem>
);

const empty_star = (
  <EuiFlexItem grow={false}>
    <EuiIcon type="starEmpty" />
  </EuiFlexItem>
);

const Rating_display: FC<Rating_display_props> = ({ rating }) => {
  //Creating an array with length of the rating to iterate over with map() to add multiple of the same element
  let filled_stars = Array(rating).map(() => filled_star);
  let empty_stars = Array(5 - rating).map(() => empty_star);

  return (
    <EuiFlexGroup justifyContent="spaceAround">
      {filled_stars}
      {empty_stars}
    </EuiFlexGroup>
  );
};

export default Restaurant_list;
