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
  label: string;
  value: string;
  onChange: (text: string) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  secureText?: boolean;
  editable?: boolean;
  defaultValue?: string;
  refInput?: any;
  error?: string;
};
