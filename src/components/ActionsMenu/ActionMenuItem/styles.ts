import styled, { css } from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px;

  &:not(:last-child) {
    margin-bottom: 4px;
  }

  &:hover {
    background-color: ${({ theme: { palette } }): string => palette.grey50};
  }
`;

export const ActionMenuIcon = styled.img`
  height: 24px;
  width: 24px;
`;

export const actionMenuTextTypographyStyles = css`
  font-size: 16px;
  line-height: 24px;
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
  margin-left: 8px;
`;
