import {
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageSection,
} from "@elastic/eui";
import React, { FC } from "react";
import Rating_display, { Rating } from "./Rating_display";
import Comment_display, { Comment_info } from "./Comment_display";

interface Restaurant {
  id: string;
  name: string;
  image_src: string;
  rating: Rating;
  comments: Comment_info[];
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
      rating: 4,
      comments: [
        {
          username: "josh",
          rating: 0,
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
  const { name, image_src, rating, comments } = restaurant;

  const description = (
    <EuiFlexGroup direction="column">
      <EuiFlexItem grow={false}>
        <Rating_display rating={rating} />
      </EuiFlexItem>

      <EuiFlexItem>
        <Comment_display limit={1} comments={comments}/>
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  return (
    <EuiCard
      paddingSize="xs"
      textAlign="left"
      image={
        <div style={{ margin: "auto" }}>
          <img
            style={{
              width: "200px",
              height: "200px",
            }}
            src={image_src}
          />
        </div>
      }
      title={name}
      description={description}
    />
  );
};

export default Restaurant_list;
