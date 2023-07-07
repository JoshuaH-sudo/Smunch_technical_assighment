import React, { FC } from "react";
import Rating_display, { Rating } from "./Rating_display";
import {
  EuiCommentList,
  EuiCommentProps,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiTitle,
} from "@elastic/eui";
import moment from "moment";

export interface Comment_info extends EuiCommentProps {
  rating: Rating;
  title: string;
  text: string;
}

interface Comment_display_props {
  /**
   * The max number of comments to show.
   * If set to `undefined` it will display all comments available
   */
  limit?: number;
  comments: Comment_info[];
}

const Comment_display: FC<Comment_display_props> = ({ comments, limit }) => {
  const parsed_comments: EuiCommentProps[] = comments
    .slice(0, limit)
    .map((comment) => {
      return {
        ...comment,
        event: "wrote a review",
        timestamp: `on ${moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}`,
        children: <Comment_info_display comment={comment} />,
      };
    });
  return <EuiCommentList gutterSize="m" comments={parsed_comments} />;
};

interface Comment_info_display_props {
  comment: Comment_info;
}
const Comment_info_display: FC<Comment_info_display_props> = ({ comment }) => {
  const { title, text, rating } = comment;

  return (
    <EuiFlexGroup direction="column">
      <EuiFlexItem grow={false}>
        <EuiTitle size="s">
          <EuiText>{title}</EuiText>
        </EuiTitle>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <Rating_display rating={rating} />
      </EuiFlexItem>

      <EuiFlexItem grow={true}>
        <EuiText size="s">{text}</EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default Comment_display;
