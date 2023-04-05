import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useAppContext from "../../../hooks/useAppContext";
import CommentListItem from "../../CommentListItem";
import Button from "../../Button";
import { CommentsListPropsType } from "../../../types/components/Comments";
import { CommentType } from "../../../types/models";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react-lite";
import { Timer } from "../../../utils/timer";
import { StyledContainer, previousCommentsButtonStyles } from "./styles";
import useCallRequestItemContext from "../../../hooks/useCallRequestItemContext";

dayjs.extend(relativeTime);

const CommentsList: React.FC<CommentsListPropsType> = (props) => {
  let timer = useRef<Timer>();
  const [pageSize, setPageSize] = useState<number>(5);
  const {
    authStore: { currentUser },
    callRequestCommentsStore,
  } = useAppContext();
  const { callRequest } = useCallRequestItemContext();
  const { children } = props;
  const { id } = callRequest;
  const comments = callRequestCommentsStore.comments.get(id);

  const sideForComment = (comment: CommentType) => {
    return currentUser?.id === comment.userId
      ? "right"
      : "left";
  };

  const getCommentsForPageSize = () => {
    if (!comments || comments.length === 0) return [];
    if (comments.length <= 5) return comments;
    if (pageSize >= comments.length) return comments;

    return comments.slice(comments.length - pageSize, comments.length);
  };

  useEffect(() => {
    callRequestCommentsStore.initCommentsForCallRequest(callRequest);
  }, [callRequestCommentsStore, callRequest]);

  useEffect(() => {
    if (!comments || comments.length === 0) return;

    const last = comments[comments.length - 1];
    const ago = dayjs(last.createdAt).fromNow(true);
    const onTimerExpire = () =>
      callRequestCommentsStore.fetchComments(callRequest);
    const isLastMessageRecent =
      ago.endsWith("seconds") ||
      ago.endsWith("minute") ||
      (ago.endsWith("minutes") && parseInt(ago) < 5);

    if (timer.current) timer.current.clear();

    if (isLastMessageRecent) {
      timer.current = new Timer(onTimerExpire, { seconds: 10, repeat: true });
    } else {
      timer.current = new Timer(onTimerExpire, { seconds: 60, repeat: true });
    }

    return () => {
      if (timer.current) timer.current.clear();
    };
  }, [callRequestCommentsStore, callRequest, comments]);

  return (
    <StyledContainer>
      {!(comments && pageSize >= comments.length) && (
        <Button
          text="Previous Messages"
          onClick={() => setPageSize(pageSize + 5)}
          css={previousCommentsButtonStyles}
        />
      )}
      {getCommentsForPageSize().map((comment) => {
        return (
          <CommentListItem
            key={uuidv4()}
            side={sideForComment(comment)}
            comment={comment}
          />
        );
      })}
      {children}
    </StyledContainer>
  );
};

export default observer(CommentsList);
