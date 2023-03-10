import { CSSProp } from "styled-components";
import { StyledElementPropsType } from "../../types/components/StyledComponent";

type ActionsMenuStyleType = {
  css?: CSSProp;
};

export type ActionsMenuStylePropsType = StyledElementPropsType;
export type ActionsMenuPropsType = ActionsMenuStyleType;
export type ActionsMenuItemPropsType = {
  text: string;
  iconSrc?: string;
  iconElement?: React.ReactElement;
  onClick: () => void;
};
