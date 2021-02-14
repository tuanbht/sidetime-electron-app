import styled, { css } from "styled-components";
import { CSSProp } from "styled-components";
import { InputStylePropsType } from "../../types/components/Input";
import { ThemeEntryType } from "../../types/theme";

export const StyledContainer = styled.div<InputStylePropsType>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 8px;
  ${(props: InputStylePropsType): CSSProp => props.css || ""}
`;

const borderColorResolver = (
  isFocused: boolean | undefined,
  hasError: boolean | undefined,
  palette: ThemeEntryType["palette"]
): string => {
  if (hasError) return palette.redDisabled;
  if (isFocused) return palette.blueGrey;
  return palette.blueGrey;
};

export const StyledInput = styled.input<InputStylePropsType>`
  height: 35px;
  min-height: 35px;
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
  border: solid 1px;
  border-radius: 5px;
  border-color: ${({ theme: { palette }, isFocused, hasError }): string =>
    borderColorResolver(isFocused, hasError, palette)};
  margin-top: 8px;
  padding-left: 8px;
  ${(props: InputStylePropsType): CSSProp => props.css || ""}
`;

export const StyledTextArea = styled.textarea<InputStylePropsType>`
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
  border: solid 1px;
  border-radius: 5px;
  border-color: ${({ theme: { palette }, isFocused, hasError }): string =>
    borderColorResolver(isFocused, hasError, palette)};
  margin-top: 8px;
  padding: 8px 8px;
  resize: none;
  ${(props: InputStylePropsType): CSSProp => props.css || ""}
`;

export const StyledSelect = styled.select<InputStylePropsType>`
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
  border: solid 1px;
  border-radius: 5px;
  border-color: ${({ theme: { palette }, isFocused, hasError }): string =>
    borderColorResolver(isFocused, hasError, palette)};
  margin-top: 8px;
  padding: 8px 8px;
  resize: none;
`;

export const StyledError = styled.big<InputStylePropsType>`
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }): string => palette.redDisabled};
  text-align: right;
  font-size: 12px;
  line-height: 16px;
`;

export const formLabelTypographyStyles = css`
  font-size: 16px;
  font-family: ${({ theme: { fonts } }) => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }): string => palette.slateGrey};
`;
