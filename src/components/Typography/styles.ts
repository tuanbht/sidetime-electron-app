import { CSSProp } from "styled-components";
import styled from "styled-components";
import { TypographyStylePropsType } from "../../types/components/Typography";

/**
 * Variants
 * */

export const DefaultStyledTypography = styled.big<TypographyStylePropsType>`
  ${(props): CSSProp => props.css || ""}
`;

export const RegularTypography = styled(DefaultStyledTypography)`
  font-weight: normal;
  ${(props): CSSProp => props.css || ""}
`;

export const MediumTypography = styled(DefaultStyledTypography)`
  font-weight: 500;
  ${(props): CSSProp => props.css || ""}
`;

export const SemiBoldTypography = styled(DefaultStyledTypography)`
  font-weight: 600;
  ${(props): CSSProp => props.css || ""}
`;

export const BoldTypography = styled(DefaultStyledTypography)`
  font-weight: bold;
  ${(props): CSSProp => props.css || ""}
`;

/**
 * Variant Mapping
 * */

export const componentVariantMapping = {
  default: DefaultStyledTypography,
  regular: RegularTypography,
  medium: MediumTypography,
  semiBold: SemiBoldTypography,
  bold: BoldTypography,
};
