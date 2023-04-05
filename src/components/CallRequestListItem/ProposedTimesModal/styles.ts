import styled, { css } from "styled-components";
import { ButtonStyleType } from "../../../types/components/Button";
import theme from "../../../constants/theme";

export const StyledContainer = styled.div`
  display: flex
  flex-direction: column;
  width: 600px;
  padding: 14px 24px;
  background: ${({ theme: { palette } }): string => palette.white};
`;

export const ModalHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const ModalBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ModalFooterContainer = styled.div`
  display: flex;
  margin-top: 24px;
`;

export const ProposedTimesContainer = styled.div`
  max-height: 400px;
  overflow-y: scroll;
`;

export const ProposedTimeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
`;

export const ProposedHourContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;

export const ProposedTimeRadioButton = styled.input`
  margin-right: 16px;
`;

export const modalHeaderTypographyStyles = css`
  font-size: 20px;
  line-height: 20px;
  font-family: ${({ theme: { fonts } }) => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }): string => palette.black};
`;

export const bodyTextTypographyStyles = css`
  display: inline-block;
  font-size: 16px;
  line-height: 16px;
  font-family: ${({ theme: { fonts } }) => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }): string => palette.black};
  margin-bottom: 20px;
`;

export const proposedTimeTypographyStyles = css`
  font-size: 20px;
  line-height: 20px;
  font-family: ${({ theme: { fonts } }) => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }): string => palette.slateGrey};
`;

export const proposedTimeTimezoneTypographyStyles = css`
  font-size: 14px;
  line-height: 14px;
  font-family: ${({ theme: { fonts } }) => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }): string => palette.blueGrey};
`;

export const acceptButtonStyles = css<ButtonStyleType>`
  background-color: ${({
    theme: {
      palette: { green, greenDisabled },
    },
    disabled,
  }): string => (disabled ? greenDisabled : green)};
  &:hover {
    background-color: ${({
      theme: {
        palette: { greenActive, greenDisabled },
      },
      disabled,
    }): string => (disabled ? greenDisabled : greenActive)};
  }
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
