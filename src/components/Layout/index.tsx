import React from "react";
import { StyledContainer } from "./styles";

const Layout: React.FC = (props) => {
  return <StyledContainer>{props.children}</StyledContainer>;
};

export default Layout;
