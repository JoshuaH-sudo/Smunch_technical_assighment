import { EuiCard, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import React, { FC, ReactNode } from "react";

interface Review_display_props {
  image_src: string;
  title: NonNullable<ReactNode>;
}
const Review_display: FC<Review_display_props> = ({ image_src, title }) => (
  <EuiCard
    paddingSize="m"
    textAlign="left"
    image={
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiFlexItem grow={false}>
          <img
            style={{
              width: "25rem",
              height: "25rem",
            }}
            src={image_src}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    }
    title={title}
  />
);

export default Review_display;
