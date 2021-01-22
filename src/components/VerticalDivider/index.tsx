import React from "react";
import { VerticalDividerPropsType } from "../../types/components/VerticalDivider";
import { StyledContainer } from "./styles";

const VerticalDivider: React.FC<VerticalDividerPropsType> = ({ css }) => {
  return <StyledContainer css={css || ""} />;
};

export default VerticalDivider;
