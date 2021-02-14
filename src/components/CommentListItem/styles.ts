import styled, { css } from "styled-components";

export const LeftCommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 500px;
  max-width: 500px;
  margin-top: 25px;
`;

export const RightCommentContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-self: flex-end;
  width: 500px;
  max-width: 500px;
  margin-top: 25px;
`;

export const CommentAvatar = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 24px;
`;

export const CommentBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
  margin-left: 16px;
`;

export const CommentAuthorContainer = styled.div`
  display: flex;
  flex-direction: row;
  // justify-content: flex-end;
`;

export const commentTypographyStyles = css`
  font-size: 16px;
  line-height: 16px;
  color: ${({ theme: { palette } }): string => palette.black};
  word-break: break-all;
  margin-bottom: 2px;
  margin-bottom: auto;
`;
export const commentAuthorStyles = css`
  font-size: 12px;
  line-height: 12px;
  color: ${({ theme: { palette } }): string => palette.blueGrey};
  margin-right: 4px;
`;
export const commentTimeStyles = css`
  font-size: 12px;
  line-height: 12px;
  color: ${({ theme: { palette } }): string => palette.blueGrey};
`;
