import { CSSProp } from "styled-components";

export type CalendarIconStyleType = {
  css?: CSSProp;
};

export type CalendarIconPropsType = CalendarIconStyleType & {
  timestamp?: string;
  month?: string;
  day?: string;
  dayofTheWeek?: string;
};
