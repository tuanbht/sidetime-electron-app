import styled, { css } from "styled-components";

export const SettingsContainer = styled.div`
  display: block;
  widht: 100%;
  background-color: ${({ theme: { palette } }) => palette.grey50};
  margin-bottom: 20px;
  padding: 20px;
`;
export const ConstrastSliderContainer = styled.div`
  display: grid;
  flex-direction: row;
  align-content: center;
`;

export const VirtualCableContainer = styled.div`
  margin-top: 20px;
`;

export const InputDeviceOption = styled.option``;

export const ContrastSlider = styled.input`
  -webkit-appearance: none;
  height: 5px;
  background: ${({ theme: { palette } }) => palette.grey100};
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 7.5px;
    background: ${({ theme: { palette } }) => palette.orangish};
  }
  margin-top: 8px;
`;

export const settingsTypographyStyles = css`
  font-size: 16px;
  line-height: 16px;
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }) => palette.slateGrey};
`;

export const labelTypographyStyles = css`
  font-size: 16px;
  line-height: 16px;
  font-family: ${({ theme: { fonts } }) => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }): string => palette.slateGrey};
  margin-top: 16px;
`;

export const detachButtonTypographyStyles = css`
  height: 20px;
  margin-left: auto;
`;
