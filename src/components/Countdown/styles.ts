import { css } from "styled-components";

export const countDownTypographyStyles = css`
  font-size: 30px;
  line-height: 30px;
  font-family: ${({ theme: { fonts } }) => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }) => palette.white};
`;
