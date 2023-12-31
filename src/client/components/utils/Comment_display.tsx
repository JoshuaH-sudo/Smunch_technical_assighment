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
import { Review_info } from "../../../server/models/review";

interface Comment_display_props {
  /**
   * The max number of comments to show.
   * If set to `undefined` it will display all comments available
   */
  limit?: number;
  comments: Review_info[];
  /**
   * Id of a user to filter reviews for
   */
  user_id_filter?: string;
}

const Comment_display: FC<Comment_display_props> = ({
  comments,
  limit,
  user_id_filter,
}) => {
  const parsed_comments: EuiCommentProps[] = comments
    .slice(0, limit)
    //Ensure the latest comment is shown first
    .sort((comment_1, comment_2) =>
      moment(comment_2.timestamp).diff(moment(comment_1.timestamp))
    )
    .filter(
      (comment) => !user_id_filter || comment.user_id._id === user_id_filter
    )
    .map((comment) => {
      return {
        ...comment,
        username: comment.user_id.username,
        event: "wrote a review",
        timestamp: `on ${moment(comment.timestamp).format(
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
