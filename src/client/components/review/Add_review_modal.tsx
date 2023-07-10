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
} from "@elastic/eui";
import React, { FC, ReactNode, useState } from "react";
import { Review_info } from "../../../server/models/review";

interface Add_review_modal_props {
  review_item_type: "Restaurant" | "Product";
  close_modal: () => void;
  on_confirm: (review: Review_info) => void;
  item_display: ReactNode;
}

const Add_review_modal: FC<Add_review_modal_props> = ({
  review_item_type,
  close_modal,
  on_confirm,
  item_display,
}) => {
  const [review_value, use_review_value] = useState<Review_info>();

  const on_confirm_handler = () => {
    if (review_value) {
      on_confirm(review_value);
    }
  };

  const update_form = (update_review: Review_info) => {
    use_review_value((previous_state) => {
      return { ...previous_state, ...update_review };
    });
  };

  return (
    <EuiModal onClose={close_modal}>
      <EuiModalHeader>{`Add ${review_item_type} Review`}</EuiModalHeader>

      <EuiModalBody>
        <EuiFlexGroup direction="column">
          <EuiFlexItem grow={false}>{item_display}</EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiHorizontalRule />
          </EuiFlexItem>

          <EuiFlexItem>
            <Review_form form_value={review_value} update_form={update_form} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiModalBody>

      <EuiModalFooter>
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem>
            <EuiButton onClick={close_modal}>Cancel</EuiButton>
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiButton onClick={on_confirm_handler}>Confirm</EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiModalFooter>
    </EuiModal>
  );
};

interface Review_form_props {
  form_value?: Review_info;
  update_form: (update_review: Review_info) => void;
}
const Review_form: FC<Review_form_props> = ({ update_form }) => {
  return (
    <EuiForm>
      <EuiFormRow title="Rating">
        <EuiFieldText />
      </EuiFormRow>

      <EuiFormRow title="Title">
        <EuiFieldText />
      </EuiFormRow>

      <EuiFormRow title="Review">
        <EuiFieldText />
      </EuiFormRow>
    </EuiForm>
  );
};

export default Add_review_modal;
