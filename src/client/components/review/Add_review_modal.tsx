import {
  EuiButton,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiHorizontalRule,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiTextArea,
} from "@elastic/eui";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { New_review, Review_info } from "../../../server/models/review";
import Select_rating from "./Select_rating";
import Auth_modal from "../auth/Auth_modal";

interface Add_review_modal_props {
  review_item_type: "Restaurant" | "Product";
  close_modal: () => void;
  on_confirm: (review: New_review) => void;
  item_display: ReactNode;
}

const Add_review_modal: FC<Add_review_modal_props> = ({
  review_item_type,
  close_modal,
  on_confirm,
  item_display,
}) => {
  const [review_value, use_review_value] = useState<New_review>({
    rating: 1,
    title: "",
    comment_text: "",
    user_id: "",
  });

  const [show_auth, set_show_auth] = useState(false);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) set_show_auth(true);
  }, [show_auth]);

  const on_confirm_handler = () => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) throw "User id not provided";

    if (review_value) {
      on_confirm({ ...review_value, user_id });
    }
  };

  const update_form = (update_review: Partial<New_review>) => {
    use_review_value((previous_state) => {
      return { ...previous_state, ...update_review };
    });
  };

  const { rating, title, comment_text } = review_value;
  const confirm_is_disabled = title.length === 0 || comment_text.length === 0;

  return (
    <>
      <EuiModal onClose={close_modal}>
        <EuiModalHeader>{`Add ${review_item_type} Review`}</EuiModalHeader>

        <EuiModalBody>
          <EuiFlexGroup direction="column">
            <EuiFlexItem grow={false}>{item_display}</EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiHorizontalRule />
            </EuiFlexItem>

            <EuiFlexItem>
              <EuiForm>
                <EuiFormRow label="Rating">
                  <Select_rating
                    rating={rating}
                    on_rating_change={(rating) => update_form({ rating })}
                  />
                </EuiFormRow>

                <EuiFormRow label="Title">
                  <EuiFieldText
                    value={title}
                    onChange={(event) =>
                      update_form({ title: event.target.value })
                    }
                  />
                </EuiFormRow>

                <EuiFormRow label="Comment">
                  <EuiTextArea
                    value={comment_text}
                    onChange={(event) =>
                      update_form({ comment_text: event.target.value })
                    }
                  />
                </EuiFormRow>
              </EuiForm>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiFlexGroup justifyContent="spaceBetween">
            <EuiFlexItem>
              <EuiButton onClick={close_modal}>Cancel</EuiButton>
            </EuiFlexItem>

            <EuiFlexItem>
              <EuiButton
                isDisabled={confirm_is_disabled}
                onClick={on_confirm_handler}
              >
                Confirm
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiModalFooter>
      </EuiModal>

      {show_auth && <Auth_modal close_modal={() => set_show_auth(false)} />}
    </>
  );
};

export default Add_review_modal;
