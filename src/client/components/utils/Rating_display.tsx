import { EuiFlexItem, EuiIcon, EuiFlexGroup } from "@elastic/eui";
import React, { FC } from "react";
import { Rating } from "../../server/models/product";

const filled_star = (
  <EuiFlexItem grow={false}>
    <EuiIcon size="l" type="starFilled" />
  </EuiFlexItem>
);

const empty_star = (
  <EuiFlexItem grow={false}>
    <EuiIcon size="l" type="starEmpty" />
  </EuiFlexItem>
);

export interface Rating_display_props {
  rating: Rating;
}
const Rating_display: FC<Rating_display_props> = ({ rating }) => {
  //Creating an array with length of the rating to iterate over with map() to add multiple of the same element
  let filled_stars = [...Array(rating)].map(() => filled_star);
  let empty_stars = [...Array(5 - rating)].map(() => empty_star);

  return (
    <EuiFlexGroup justifyContent="center" gutterSize="xs">
      {filled_stars}
      {empty_stars}
    </EuiFlexGroup>
  );
};

export default Rating_display;
