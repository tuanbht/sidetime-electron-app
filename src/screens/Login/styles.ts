import styled, { css } from "styled-components";

export const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ theme: { palette } }) => palette.grey10};
`;

export const Logo = styled.img`
  width: 260px;
  margin-bottom: 16px;
`;

export const FormContainer = styled.div`
  box-sizing: border-box;
  width: 460px;
  height: 415px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  padding: 36px 60px 65px 60px;
  background-color: ${({ theme: { palette } }) => palette.white};
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
`;

export const FormFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 42px;
`;

export const sloganTypographyStyles = css`
  font-family: ${({ theme: { fonts } }) => fonts.neuzeitGrotesk};
  font-size: 24px;
  line-height: 24px;
  color: ${({ theme: { palette } }) => palette.blueGrey};
`;
export const welcomeTypographyStyles = css`
  font-family: ${({ theme: { fonts } }) => fonts.neuzeitGrotesk};
  font-size: 30px;
  line-height: 30px;
  color: ${({ theme: { palette } }) => palette.orangish};
`;

export const loginTypographyStyles = css`
  font-family: ${({ theme: { fonts } }) => fonts.neuzeitGrotesk};
  font-size: 20px;
  line-height: 20px;
  margin-top: 12px;
  color: ${({ theme: { palette } }) => palette.slateGrey};
`;

export const submitButtonStyles = css`
  margin-top: 25px;
`;
