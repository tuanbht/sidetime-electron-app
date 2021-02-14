import styled, { css } from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const commentInputStyles = css`
  border-width: 0px;
  &:focus {
    outline: none;
  }
  margin-top: 0px;
  padding: 0px;
`;

export const sendButtonStyles = css`
  width: 75px;
  align-self: flex-end;
`;
