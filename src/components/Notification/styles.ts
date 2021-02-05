import styled, { css, keyframes } from "styled-components";
import theme from "../../constants/theme";
import { ButtonStyleType } from "../../types/components/Button";
// @ts-ignore
import { slideInDown } from "react-animations";

const slideInDownAnimation = keyframes`${slideInDown}`;
export const StyledContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  width: 100%;
  height: 55px;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  z-index: 999;
  border-radius: 4px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: ${({ theme: { palette } }): string => palette.white};
  animation: 0.5s ${slideInDownAnimation};
`;

export const notificationMessageTypographyStyles = css`
  font-size: 16px;
  line-height: 24px;
  margin-left: 8px;
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }): string => palette.black};
`;

export const dismissButtonStyles = css<ButtonStyleType>`
  background-color: ${({ theme: { palette } }): string => palette.white};
  &:hover {
    background-color: ${({ theme: { palette } }): string => palette.grey10};
  }
  margin-left: auto;
`;

export const dismissButtonIconStyles: React.CSSProperties = {
  color: theme.palette.slateGrey,
};

export const successNotificationIconStyles: React.CSSProperties = {
  color: theme.palette.green,
};

export const errorNotificationIconStyles: React.CSSProperties = {
  color: theme.palette.red,
};
