import { css } from "styled-components";
import { ButtonStyleType } from "../../../types/components/Button";
import theme from "../../../constants/theme";

export const greenButtonStyles = css<ButtonStyleType>`
  background-color: ${({ theme: { palette } }): string => palette.green};
  padding: 0px 16px;
  &:hover {
    background-color: ${({ theme: { palette } }): string =>
      palette.greenActive};
  }
`;

export const actionButtonStyles = css<ButtonStyleType>`
  background-color: ${({ theme: { palette } }): string => palette.white};
  &:hover {
    background-color: ${({ theme: { palette } }): string => palette.grey10};
  }
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme: { palette } }): string => palette.blueGrey};
  margin-right: 8px;
`;

export const deleteButtonStyles = css<ButtonStyleType>`
  background-color: ${({ theme: { palette } }): string => palette.white};
  color: ${({ theme: { palette } }): string => palette.red};
  &:hover {
    background-color: ${({ theme: { palette } }): string => palette.grey10};
  }
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme: { palette } }): string => palette.red};
  margin-right: 8px;
`;

export const declineButtonStyles = css<ButtonStyleType>`
  background-color: ${({ theme: { palette } }): string => palette.white};
  &:hover {
    background-color: ${({ theme: { palette } }): string => palette.grey10};
  }
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme: { palette } }): string => palette.red};
  margin-right: 8px;
  padding: 0px 16px;
`;

export const proposedTimesButtonStyles = css<ButtonStyleType>`
  padding: 0px 16px;
  margin-right: 8px;
`;

export const declineButtonTextStyles = css<ButtonStyleType>`
  color: ${({ theme: { palette } }): string => palette.red};
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
  font-size: 16px;
  line-height: 16px;
`;

export const actionIconStyles: React.CSSProperties = {
  color: theme.palette.slateGrey,
  padding: "16px 10px",
};

export const deleteIconStyles: React.CSSProperties = {
  color: theme.palette.red,
  padding: "16px 10px",
};

export const declineIconStyles: React.CSSProperties = {
  color: theme.palette.red,
  marginRight: "10px",
};

export const greenButtonIconStyles: React.CSSProperties = {
  marginRight: "10px",
  color: theme.palette.white,
};
