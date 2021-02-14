import React from "react";
import Typography from "../Typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CommentListItemPropsType } from "../../types/components/CommentListItem";
import {
  LeftCommentContainer,
  RightCommentContainer,
  CommentAvatar,
  CommentBodyContainer,
  CommentAuthorContainer,
  commentTypographyStyles,
  commentAuthorStyles,
  commentTimeStyles,
} from "./styles";

dayjs.extend(relativeTime);

const CommentListItem: React.FC<CommentListItemPropsType> = (props) => {
  const { comment, callRequest, side } = props;
  const { expert, requester } = callRequest;

  const avatarForComment = () => {
    return (comment.user_id === expert.id ? expert : requester).avatar_url;
  };

  const authorForComment = () => {
    return (comment.user_id === expert.id ? expert : requester).name;
  };

  const timeLabelForComment = () => {
    return dayjs(comment.created_at).fromNow();
  };

  const StyledContainer =
    side === "left" ? LeftCommentContainer : RightCommentContainer;
  return (
    <StyledContainer>
      <CommentAvatar src={avatarForComment()} />
      <CommentBodyContainer>
        <Typography
          variant="regular"
          text={comment.body}
          css={commentTypographyStyles}
        />
        <CommentAuthorContainer>
          <Typography
            variant="bold"
            text={authorForComment()}
            css={commentAuthorStyles}
          />
          <Typography
            variant="regular"
            text={timeLabelForComment()}
            css={commentTimeStyles}
          />
        </CommentAuthorContainer>
      </CommentBodyContainer>
    </StyledContainer>
  );
};

export default CommentListItem;
