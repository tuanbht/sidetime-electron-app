import React from "react";
import { TypographyPropsType } from "../../types/components/Typography";
import { componentVariantMapping } from "./styles";

const Typography = ({
  variant,
  text,
  css,
  onClick,
}: TypographyPropsType): JSX.Element => {
  const StyledText = componentVariantMapping[variant];

  return (
    <StyledText css={css || ""} onClick={onClick}>
      {text}
    </StyledText>
  );
};

export default Typography;
