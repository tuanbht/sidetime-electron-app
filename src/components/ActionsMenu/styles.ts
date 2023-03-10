import styled from "styled-components";
import { CSSProp } from "styled-components";
import { ActionsMenuStylePropsType } from "../../types/components/ActionsMenu";

export const StyledContainer = styled.div<ActionsMenuStylePropsType>`
  width: 160px;
  border-radius: 4px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: ${({ theme: { palette } }): string => palette.white};
  ${(props: ActionsMenuStylePropsType): CSSProp => props.css || ""}
`;
