import styled from "styled-components";
import { CSSProp } from "styled-components";
import { ActionsMenuStylePropsType } from "../../types/components/ActionsMenu";

export const StyledContainer = styled.div<ActionsMenuStylePropsType>`
  width: 136px;
  padding: 20px 20px;
  border-radius: 4px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
  ${(props: ActionsMenuStylePropsType): CSSProp => props.css || ""}
`;
