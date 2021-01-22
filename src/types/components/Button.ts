import { CSSProp } from "styled-components";

export type ButtonStyleType = {
  css?: CSSProp;
  disabled?: boolean;
};

export type ButtonPropsType = ButtonStyleType & {
  text?: string;
  icon?: React.ReactElement;
  isLoading?: boolean;
  buttonTextCss?: CSSProp;
  onClick: () => void;
};
