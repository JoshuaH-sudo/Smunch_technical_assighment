import React, { FC, useEffect, useState } from "react";
import { Rating } from "../../../server/models/product";
import { EuiFlexGroup, EuiFlexItem, EuiIcon } from "@elastic/eui";

interface Select_rating_props {
  on_rating_change: (rating: Rating) => void;
}

const Select_rating: FC<Select_rating_props> = ({ on_rating_change }) => {
  const [rating, set_rating] = useState<Rating>(0);

  const select_rating = (rating: number) => {
    // There will only be 5 stars
    set_rating(rating as Rating);
  };

  useEffect(() => {
    on_rating_change(rating);
  }, [rating]);

  //Creating an array with length of the rating to iterate over with map() to add multiple of the same element
  const stars = [...Array(5)].map((_, index) => (
    <EuiFlexItem onClick={() => select_rating(index + 1)} grow={false}>
      <EuiIcon
        size="l"
        type={index + 1 < rating ? "starFilled" : "starEmpty"}
      />
    </EuiFlexItem>
  ));

  return (
    <EuiFlexGroup justifyContent="center" gutterSize="xs">
      {stars}
    </EuiFlexGroup>
  );
};

export default Select_rating;
