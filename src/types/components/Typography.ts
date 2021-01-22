import { CSSProp } from "styled-components";

import { StyledElementPropsType } from "../../types/components/StyledComponent";

export type TypographyVariantsType =
  | "default"
  | "regular"
  | "medium"
  | "semiBold"
  | "bold";

export type TypographyStyleType = {
  css?: CSSProp;
  onClick?: () => void;
};

export type TypographyStylePropsType = StyledElementPropsType &
  TypographyStyleType;

export type TypographyPropsType = TypographyStyleType & {
  variant: TypographyVariantsType;
  text: string;
};
