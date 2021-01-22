import styled, { css } from "styled-components";
import { CalendarIconStyleType } from "../../types/components/CalendarIcon";

export const StyledContainer = styled.div<CalendarIconStyleType>`
  width: 70px;
  text-align: center;
`;
export const MonthContainer = styled.div<CalendarIconStyleType>`
  padding: 7px 0px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  background-color: ${({ theme: { palette } }): string => palette.orangish};
`;
export const DayContainer = styled.div<CalendarIconStyleType>`
  padding: 5px 0px;
  display: flex;
  flex-direction: column;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  background-color: ${({ theme: { palette } }): string => palette.white};
`;

export const monthTypographyStyles = css`
  font-size: 14px;
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }): string => palette.white};
`;
export const dayTypographyStyles = css`
  font-size: 30px;
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }): string => palette.darkGrey};
`;
export const dayOfTheWeekTypographyStyles = css`
  font-size: 12px;
  font-family: ${({ theme: { fonts } }): string => fonts.neuzeitGrotesk};
  color: ${({ theme: { palette } }): string => palette.blueGrey};
`;
