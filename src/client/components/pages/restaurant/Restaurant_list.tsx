import { EuiFlexGroup, EuiFlexItem, EuiPageSection } from "@elastic/eui";
import React, { FC, useEffect, useState } from "react";
import { Restaurant_data } from "./types";
import Restaurant_card from "./Restaurant_card";
import { get } from "../../utils/api";

const Restaurant_list: FC = () => {
  const [restaurant_list, set_restaurant_list] = useState<Restaurant_data[]>(
    []
  );

  const get_restaurants = async () => {
    try {
      const response = await get<Restaurant_data[]>("restaurant");
      set_restaurant_list(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    get_restaurants();
  }, []);

  const list = restaurant_list.map((restaurant) => (
    <EuiFlexItem key={restaurant._id} grow={false}>
      <Restaurant_card restaurant={restaurant} />
    </EuiFlexItem>
  ));
  return (
    <EuiPageSection restrictWidth={"80%"} grow={true}>
      <EuiFlexGroup direction="column">{list}</EuiFlexGroup>
    </EuiPageSection>
  );
};

export default Restaurant_list;
