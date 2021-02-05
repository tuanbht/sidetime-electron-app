import styled, { css } from "styled-components";
import { ButtonStyleType } from "../../../types/components/Button";
import theme from "../../../constants/theme";

export const StyledContainer = styled.div`
  display: flex
  flex-direction: column;
  width: 350px;
  padding: 14px 24px;
  background: ${({ theme: { palette } }): string => palette.white};
`;

export const ModalHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const ModalBodyContainer = styled.div``;
export const ModalFooterContainer = styled.div`
  display: flex;
  place-content: flex-end;
  margin-top: 24px;
`;

export const DisclaimerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

export const modalHeaderTypographyStyles = css`
  font-size: 20px;
  line-height: 20px;
  font-family: ${({ theme: { fonts } }) => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }): string => palette.black};
`;

export const confirmationTypographyStyles = css`
  display: inline-block;
  font-size: 16px;
  line-height: 16px;
  font-family: ${({ theme: { fonts } }) => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }): string => palette.black};
  margin-bottom: 24px;
`;

export const disclaimerTypographyStyles = css`
  display: inline-block;
  font-size: 16px;
  line-height: 16px;
  font-family: ${({ theme: { fonts } }) => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }): string => palette.black};
`;

export const cancelCallRequestButtonStyles = css<ButtonStyleType>`
  padding: 0px 16px;
`;

export const goBackButtonStyles = css<ButtonStyleType>`
  background-color: ${({ theme: { palette } }): string => palette.white};
  &:hover {
    background-color: ${({ theme: { palette } }): string => palette.grey10};
  }
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme: { palette } }): string => palette.blueGrey};
  margin-right: 8px;
  padding: 0px 16px;
`;

export const goBackButtonTextStyles = css`
  font-size: 16px;
  line-height: 16px;
  font-family: ${({ theme: { fonts } }) => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }): string => palette.slateGrey};
`;

export const closeButtonStyles = css<ButtonStyleType>`
  background-color: ${({ theme: { palette } }): string => palette.white};
  &:hover {
    background-color: ${({ theme: { palette } }): string => palette.grey10};
  }
  margin-left: auto;
`;

export const closeButtonIconStyles: React.CSSProperties = {
  color: theme.palette.slateGrey,
};

export const disclaimerIconStyles: React.CSSProperties = {
  color: theme.palette.red,
  marginRight: "12px",
};
