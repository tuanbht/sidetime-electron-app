import React from "react";
import Typography from "../Typography";
import LoadingIcon from "../LoadingIcon";
import { ButtonPropsType } from "../../types/components/Button";
import { ButtonContainer, buttonTextTypographyStyles } from "./styles";

const Button: React.FC<ButtonPropsType> = ({
  text,
  isLoading = false,
  disabled = false,
  css,
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
        <Typography
          variant="bold"
          text={text}
          css={buttonTextTypographyStyles}
        />
      )}
    </ButtonContainer>
  );
};

export default Button;
