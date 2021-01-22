import styled from "styled-components";
import { StyledElementPropsType } from "../../types/components/StyledComponent";

export const StyledContainer = styled.div<StyledElementPropsType>`
  height: 100vh;
  background-color: ${({ theme: { palette } }) => palette.grey10};
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;
