import React, { FC } from "react";
import Rating_display from "./Rating_display";
import {
  EuiCommentList,
  EuiCommentProps,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiTitle,
} from "@elastic/eui";
import moment from "moment";
import { Review_info } from "../../server/models/review";

interface Comment_display_props {
  /**
   * The max number of comments to show.
   * If set to `undefined` it will display all comments available
   */
  limit?: number;
  comments: Review_info[];
}

const Comment_display: FC<Comment_display_props> = ({ comments, limit }) => {
  const parsed_comments: EuiCommentProps[] = comments
    .slice(0, limit)
    //Ensure the latest comment is shown first
    .sort((comment_1, comment_2) =>
      moment(comment_1.timestamp_date).diff(moment(comment_2.timestamp_date))
    )
    .map((comment) => {
      return {
        ...comment,
        event: "wrote a review",
        timestamp: `on ${moment(comment.timestamp_date).format(
          "dddd, MMMM Do YYYY, h:mm:ss a"
        )}`,
        children: <Comment_info_display comment={comment} />,
      };
    });
  return <EuiCommentList gutterSize="m" comments={parsed_comments} />;
};

interface Comment_info_display_props {
  comment: Review_info;
}
const Comment_info_display: FC<Comment_info_display_props> = ({ comment }) => {
  const { title, comment_text, rating } = comment;

  return (
    <EuiFlexGroup direction="column">
      <EuiFlexItem>
        <EuiFlexGroup direction="row">
          <EuiFlexItem grow={false}>
            <EuiTitle size="s">
              <EuiText>{title}</EuiText>
            </EuiTitle>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <Rating_display rating={rating} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>

      <EuiFlexItem grow={true}>
        <EuiText size="s">{comment_text}</EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default Comment_display;
