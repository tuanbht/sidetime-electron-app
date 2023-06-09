import styled, { css } from "styled-components";
import { ButtonStyleType } from "../../../types/components/Button";
import theme from "../../../constants/theme";

export const StyledContainer = styled.div`
  box-sizing: border-box;
  width: 1280px;
  height: 100vh;
  padding: 35px 40px 135px 70px;
  margin: auto;
  background-color: ${({ theme: { palette } }) => palette.grey10};
`;

export const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const TabsContainer = styled.div`
  display: flex;
  align-itens: center;
  margin-top: 32px;
`;

export const LeftWelcomeContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const RightActionsMenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
export const TabContainer = styled.div`
  padding-bottom: 50px;
`;
export const ListCallsContainer = styled.div`
  margin-bottom: 24px;
`;

export const RightActionsMenu = styled.div``;
export const RightActionsMenuItem = styled.div``;

export const Logo = styled.img`
  height: 42px;
  margin-right: 42px;
  align-self: flex-start;
`;

export const Avatar = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 24px;
`;

export const tabNameTypographyStyles = css`
  font-size: 16px;
  line-height: 16px;
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }) => palette.blueGrey};
  margin-right: 25px;
  cursor: pointer;
`;

export const tabNameActiveTypographyStyles = css`
  font-size: 16px;
  line-height: 16px;
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }) => palette.orangish};
  margin-right: 25px;
  padding-bottom: 4px;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme: { palette } }): string => palette.orangish};
  border-bottom-style: solid;
  cursor: pointer;
`;

export const welcomeMessageTypographyStyles = css`
  font-size: 30px;
  line-height: 42px;
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }) => palette.slateGrey};
  margin-left: 25px;
`;

export const currentSiteTypographyStyles = css`
  font-size: 16px;
  line-height: 16px;
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }) => palette.slateGrey};
  margin-left: 25px;
`;

export const tabSectionNameTypographyStyles = css`
  display: block;
  margin-top: 40px;
  font-size: 12px;
  line-height: 12px;
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }) => palette.slateGrey};
`;

export const emptyTabSectionTypographyStyles = css`
  display: block;
  margin-top: 25px;
  font-size: 20px;
  line-height: 20px;
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }) => palette.darkGrey};
`;

export const verticalDividerStyles = css`
  height: 65px;
`;

export const actionMenuStyles = css`
  position: absolute;
  right: 32px;
  top: 48px;
`;

export const refreshButtonStyles = css<ButtonStyleType>`
  background-color: ${({ theme: { palette } }): string => palette.grey10};
  &:hover {
    background-color: ${({ theme: { palette } }): string => palette.grey10};
  }
  height: 16px;
  line-height: 16px;
`;

export const refreshIconStyles: React.CSSProperties = {
  color: theme.palette.blueGrey,
};
