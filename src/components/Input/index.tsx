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
  StyledError,
  formLabelTypographyStyles,
} from "./styles";

export interface InputInterface {
  setError: (error: string | undefined) => void;
}

const Input: ForwardRefRenderFunction<InputInterface, InputPropsType> = (
  {
    label,
    value,
    error,
    refInput,
    editable = true,
    secureText = false,
    css,
    onChange,
    onFocus,
    onBlur,
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

  return (
    <StyledContainer css={css || ""}>
      <Typography variant="bold" text={label} css={formLabelTypographyStyles} />
      <StyledInput
        onChange={(e) => {
          setInnerValue(e.target.value);
          onChange(e.target.value);
        }}
        value={innerValue}
        disabled={!editable}
        type={secureText ? "password" : "text"}
        onFocus={(event): void => {
          if (onFocus !== undefined) onFocus(event);
          setFocused(true);
        }}
        onBlur={(event): void => {
          if (onBlur !== undefined) onBlur(event);
          setFocused(false);
        }}
        hasError={!!innerError}
        isFocused={isFocused}
        ref={refInput}
      />
      {innerError && <StyledError>{innerError}</StyledError>}
    </StyledContainer>
  );
};

export default React.forwardRef(Input);
