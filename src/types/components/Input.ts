import { CSSProp } from "styled-components";
import { StyledElementPropsType } from "../../types/components/StyledComponent";

type InputStyleType = {
  css?: CSSProp;
};

export type InputStylePropsType = StyledElementPropsType &
  InputStyleType & {
    isFocused?: boolean;
    hasError?: boolean;
  };

export type InputPropsType = InputStyleType & {
  type?: "text-area" | "text" | "select" | "date";
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  secureText?: boolean;
  editable?: boolean;
  defaultValue?: string;
  refInput?: any;
  min?: string;
  error?: string;
  numRows?: number;
  children?: any;
};
