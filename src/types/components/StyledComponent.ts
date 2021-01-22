import { ThemeEntryType } from "../../types/theme";
import { CSSProp } from "styled-components";

export type StyledElementPropsType = {
  theme: ThemeEntryType;
  css?: CSSProp;
};
