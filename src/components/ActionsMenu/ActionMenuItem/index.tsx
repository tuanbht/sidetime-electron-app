import React from "react";
import Typography from "../../Typography";
import { ActionsMenuItemPropsType } from "../../../types/components/ActionsMenu";
import {
  StyledContainer,
  ActionMenuIcon,
  actionMenuTextTypographyStyles,
} from "./styles";

const ActionMenuItem: React.FC<ActionsMenuItemPropsType> = ({
  icon,
  text,
  onClick,
}) => {
  return (
    <StyledContainer onClick={onClick}>
      <ActionMenuIcon src={icon} />
      <Typography
        variant="regular"
        text={text}
        css={actionMenuTextTypographyStyles}
      />
    </StyledContainer>
  );
};

export default ActionMenuItem;
