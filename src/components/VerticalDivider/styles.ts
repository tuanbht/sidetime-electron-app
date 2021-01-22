import styled from "styled-components";
import { CSSProp } from "styled-components";
import { VerticalDividerStyleType } from "../../types/components/VerticalDivider";

export const StyledContainer = styled.div<VerticalDividerStyleType>`
  border-right-width: 1px;
  border-right-color: ${({ theme: { palette } }): string => palette.grey50};
  border-right-style: solid;
  width: 1px;
  height: 35px;
  ${(props: VerticalDividerStyleType): CSSProp => props.css || ""}
`;
