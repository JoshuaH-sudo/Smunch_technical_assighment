import {
  EuiButton,
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
import Auth_modal from "../../auth/Auth_modal";

const Restaurant_list: FC = () => {
  const [restaurant_list, set_restaurant_list] = useState<Restaurant_data[]>(
    []
  );
  const [cuisine_options, set_cuisine_options] = useState<EuiSelectOption[]>();
  const [filter_cuisine, set_filter_cuisine] = useState<string>("any");
  const [filter_user_id, set_filter_user_id] = useState<string>();
  const [show_auth, set_show_auth] = useState(false);

  const filter_reviews = () => {
    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
      set_show_auth(true);
    } else {
      //Toggle the filter
      if (filter_user_id) set_filter_user_id(undefined);
      else set_filter_user_id(user_id);
    }
  };

  const on_auth_close = () => {
    const user_id = localStorage.getItem("user_id");

    if (user_id) {
      set_filter_user_id(user_id);
    }

    set_show_auth(false);
  };

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
        <Restaurant_card
          restaurant={restaurant}
          filter_user_id={filter_user_id}
        />
      </EuiFlexItem>
    ));
  return (
    <EuiPageSection restrictWidth={"80%"} grow={true}>
      <EuiFlexGroup direction="column">
        <EuiFlexItem>
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiSelect
                prepend={<EuiText>Cuisine Filter</EuiText>}
                value={filter_cuisine}
                options={cuisine_options}
                onChange={(event) => set_filter_cuisine(event.target.value)}
              />
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButton fill={!!filter_user_id} onClick={filter_reviews}>
                Show User's Reviews
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
        {list}
      </EuiFlexGroup>
      {show_auth && <Auth_modal close_modal={on_auth_close} />}
    </EuiPageSection>
  );
};

export default Restaurant_list;
