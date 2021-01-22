import { CSSProp } from "styled-components";

export type ButtonStyleType = {
  css?: CSSProp;
  disabled?: boolean;
};

export type ButtonPropsType = ButtonStyleType & {
  text: string;
  isLoading?: boolean;
  onClick: () => void;
};
