import styled from "styled-components";
import { StyledElementPropsType } from "../../types/components/StyledComponent";

export const LoaderContainer = styled.div<StyledElementPropsType>`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  animation: spin 2s linear infinite;
  border-radius: 50%;
  height: 16px;
  width: 16px;
  border: 3px solid ${({ theme: { palette } }) => palette.white};
  border-top: 3px solid ${({ theme: { palette } }) => palette.transparent};
  background-color: ${({ theme: { palette } }) => palette.transparent};
`;
