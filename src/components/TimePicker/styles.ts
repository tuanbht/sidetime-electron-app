import styled, { css } from "styled-components";
import { ButtonStyleType } from "../../types/components/Button";
import { InputStylePropsType } from "../../types/components/Input";

export const StyledContainer = styled.div`
  display: flex;
  height: 60px;
`;

export const TimeOption = styled.option``;

export const inputStyles = css<InputStylePropsType>`
  margin-right: 8px;
  margin-bottom: 0px;
  width: 100%;
`;

export const addTimeButtonStyles = css<ButtonStyleType>`
  width: 230px;
  background-color: ${({ theme: { palette } }): string => palette.white};
  &:hover {
    background-color: ${({ theme: { palette } }): string => palette.grey10};
  }
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme: { palette } }): string => palette.blueGrey};
  padding: 0px 16px;
  margin-top: auto;
`;

export const addTimeButtonTextStyles = css`
  font-size: 16px;
  line-height: 16px;
  font-family: ${({ theme: { fonts } }) => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }): string => palette.slateGrey};
`;
