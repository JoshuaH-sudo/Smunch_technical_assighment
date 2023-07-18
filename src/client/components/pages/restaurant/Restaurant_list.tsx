import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageSection,
  EuiSelect,
  EuiSelectOption,
  EuiText,
} from "@elastic/eui";
import React, { FC, useEffect, useState } from "react";
import Restaurant_card from "./Restaurant_card";
import { get } from "../../utils/api";
import { Restaurant_data } from "../../../../server/models/restaurant";
import { capitalize } from "../../utils/tools";

const Restaurant_list: FC = () => {
  const [restaurant_list, set_restaurant_list] = useState<Restaurant_data[]>(
    []
  );
  const [cuisine_options, set_cuisine_options] = useState<EuiSelectOption[]>();
  const [filter_cuisine, set_filter_cuisine] = useState<string>("any");

  const get_restaurants = async () => {
    try {
      const response = await get<Restaurant_data[]>("restaurant");
      set_restaurant_list(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const no_filter_option: EuiSelectOption = {
    text: "Any",
    value: "any",
  };

  const get_cuisine_options = async () => {
    try {
      const response = await get<string[]>("restaurant/cuisine_options");
      const options = response.data.map<EuiSelectOption>((cuisine_type) => {
        return {
          text: capitalize(cuisine_type),
          value: cuisine_type,
        };
      });
      options.push(no_filter_option);
      set_cuisine_options(options);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    get_restaurants();
    get_cuisine_options();
  }, []);

  const list = restaurant_list
    .filter(
      (restaurant) =>
        filter_cuisine === "any" || restaurant.cuisine === filter_cuisine
    )
    .map((restaurant) => (
      <EuiFlexItem key={restaurant._id} grow={false}>
        <Restaurant_card restaurant={restaurant} />
      </EuiFlexItem>
    ));
  return (
    <EuiPageSection restrictWidth={"80%"} grow={true}>
      <EuiFlexGroup direction="column">
        <EuiFlexItem>
          <EuiSelect
            prepend={<EuiText>Cuisine Filter</EuiText>}
            value={filter_cuisine}
            options={cuisine_options}
            onChange={(event) => set_filter_cuisine(event.target.value)}
          />
        </EuiFlexItem>
        {list}
      </EuiFlexGroup>
    </EuiPageSection>
  );
};

export default Restaurant_list;
