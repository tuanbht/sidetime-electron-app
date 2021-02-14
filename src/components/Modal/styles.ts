import styled, { keyframes } from "styled-components";
// @ts-ignore
import { fadeIn } from "react-animations";
const fadeInAnimation = keyframes`${fadeIn}`;

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  animation: 0.5s ${fadeInAnimation};
`;
