import styled, { css } from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const ActionMenuIcon = styled.img`
  height: 24px;
  width: 24px;
  margin-right: 8px;
`;
export const actionMenuTextTypographyStyles = css`
  font-size: 16px;
  line-height: 24px;
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
`;
