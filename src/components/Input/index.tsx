import dayjs from "dayjs";
import React, {
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from "react";
import Typography from "../../components/Typography";
import { InputPropsType } from "../../types/components/Input";
import {
  StyledContainer,
  StyledInput,
  StyledTextArea,
  StyledSelect,
  StyledError,
  formLabelTypographyStyles,
} from "./styles";

export interface InputInterface {
  setError: (error: string | undefined) => void;
}

const Input: ForwardRefRenderFunction<InputInterface, InputPropsType> = (
  {
    type = "text",
    label,
    placeholder,
    value,
    min = dayjs().add(1, "day").format("YYYY-MM-DD"),
    error,
    refInput,
    editable = true,
    secureText = false,
    css,
    numRows,
    onChange,
    onFocus,
    onBlur,
    children,
  },
  ref
): JSX.Element => {
  const [innerValue, setInnerValue] = useState<string | undefined>(value);
  const [innerError, setInnerError] = useState<string | undefined>(error);
  const [isFocused, setFocused] = useState<boolean>(false);

  const setError = useCallback((err) => {
    setInnerError(err);
  }, []);

  useEffect(() => {
    setInnerError(error);
  }, [error]);

  useImperativeHandle(ref, () => {
    return { setError };
  });

  const inputProps = {
    onChange: (e: any) => {
      setInnerValue(e.target.value);
      onChange(e.target.value);
    },
    value: innerValue,
    placeholder: placeholder,
    min: min,
    disabled: !editable,
    type: secureText ? "password" : type,
    onFocus: (event: any): void => {
      if (onFocus !== undefined) onFocus(event);
      setFocused(true);
    },
    onBlur: (event: any): void => {
      if (onBlur !== undefined) onBlur(event);
      setFocused(false);
    },
    hasError: !!innerError,
    isFocused: isFocused,
    ref: refInput,
  };

  const renderInput = () => {
    if (type === "text-area") {
      return <StyledTextArea {...inputProps} rows={numRows} />;
    } else if (type === "select") {
      return <StyledSelect {...inputProps}>{children}</StyledSelect>;
    }

    return <StyledInput {...inputProps} />;
  };

  return (
    <StyledContainer css={css || ""}>
      {label ? (
        <Typography
          variant="bold"
          text={label}
          css={formLabelTypographyStyles}
        />
      ) : null}
      {renderInput()}
      {innerError && <StyledError>{innerError}</StyledError>}
    </StyledContainer>
  );
};

export default React.forwardRef(Input);
