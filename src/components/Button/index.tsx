import React from "react";
import Typography from "../Typography";
import LoadingIcon from "../LoadingIcon";
import { ButtonPropsType } from "../../types/components/Button";
import { ButtonContainer, buttonTextTypographyStyles } from "./styles";

const Button: React.FC<ButtonPropsType> = ({
  text,
  icon,
  isLoading = false,
  disabled = false,
  css,
  buttonTextCss,
  onClick,
}) => {
  return (
    <ButtonContainer
      css={css || ""}
      disabled={disabled || isLoading}
      type="button"
      onClick={onClick}
    >
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          {icon}
          {text ? (
            <Typography
              variant="bold"
              text={text}
              css={buttonTextCss || buttonTextTypographyStyles}
            />
          ) : null}
        </>
      )}
    </ButtonContainer>
  );
};

export default Button;
