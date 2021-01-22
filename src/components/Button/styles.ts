import styled, { css } from "styled-components";
import { CSSProp } from "styled-components";
import { ButtonStyleType } from "../../types/components/Button";

export const ButtonContainer = styled.button<ButtonStyleType>`
  display: flex;
  height: 34px;
  text-align: center;
  justify-content: center;
  align-items: center;
  border: 0px;
  border-radius: 5px;
  background-color: ${({
    theme: {
      palette: { redDisabled, orangish },
    },
    disabled,
  }): string => (disabled ? redDisabled : orangish)};
  &:hover {
    background-color: ${({
      theme: {
        palette: { redDisabled, orangishHovering },
      },
      disabled,
    }): string => (disabled ? redDisabled : orangishHovering)};
  }
  &:active {
    background-color: ${({ theme: { palette } }) => palette.orangishActive};
  }
  ${(props: ButtonStyleType): CSSProp => props.css || ""}
`;

export const buttonTextTypographyStyles = css`
  font-size: 16px;
  font-family: ${({ theme: { fonts } }) => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }): string => palette.white};
`;
