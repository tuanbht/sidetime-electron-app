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
import useAppContext from "../../hooks/useAppContext";
import useCallRequestItemContext from "../../hooks/useCallRequestItemContext";

dayjs.extend(relativeTime);

const CommentListItem: React.FC<CommentListItemPropsType> = (props) => {
  const { comment, side } = props;
  const { callRequest } = useCallRequestItemContext();
  const { otherUser } = callRequest;

  const { authStore: { currentUser } } = useAppContext()

  const avatarForComment = () => {
    return (comment.userId === otherUser.id ? otherUser.avatar : currentUser?.avatarUrl);
  };

  const authorForComment = () => {
    return (comment.userId === otherUser.id ? otherUser : currentUser)?.name || '';
  };

  const timeLabelForComment = () => {
    return dayjs(comment.createdAt).fromNow();
  };

  const StyledContainer =
    side === "left" ? LeftCommentContainer : RightCommentContainer;

  return (
    <StyledContainer>
      <CommentAvatar src={avatarForComment()} />
      <CommentBodyContainer>
        <Typography
          variant="regular"
          text={comment.message}
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
