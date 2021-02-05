import styled, { css } from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 40px 30px;
  height: 100vh;
  background-color: ${({ theme: { palette } }) => palette.grey100};
  align-items: center;
  justify-content: center;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Logo = styled.img`
  height: 56px;
  width: 266px;
`;

export const poweredByTypographyStyles = css`
  font-size: 20px;
  font-family: ${({ theme: { fonts } }) => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }) => palette.blueGrey};
  margin-bottom: 10px;
`;

export const Button = styled.button``;
