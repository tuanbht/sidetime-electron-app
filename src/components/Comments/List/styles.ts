import styled, { keyframes, css } from "styled-components";
// @ts-ignore
import { fadeIn } from "react-animations";
const fadeInAnimation = keyframes`${fadeIn}`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  animation: 1s ${fadeInAnimation};
`;

export const previousCommentsButtonStyles = css`
  background-color: ${({ theme: { palette } }): string => palette.grey50};
  width: 200px;
  align-self: center;
`;
