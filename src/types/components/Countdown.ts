import { CSSProp } from "styled-components";

export type CountdownStyleType = {
  css?: CSSProp;
};

export type TimerType = {
  timeInSeconds: number;
  onExpire: () => void;
};

export type CountdownPropsType = CountdownStyleType & {
  countdownInSeconds: number;
  timers?: TimerType[];
};
