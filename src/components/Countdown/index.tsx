import React, {
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Typography from "../Typography";
import { CountdownPropsType } from "../../types/components/Countdown";
import {
  countDownTypographyStyles,
  minutesRemaningTypographyStyles,
} from "./styles";

export interface CountdownInterface {
  resume: () => void;
  pause: () => void;
  reset: () => void;
}

const Countdown: ForwardRefRenderFunction<
  CountdownInterface,
  CountdownPropsType
> = ({ countdownInSeconds, timers, css }, ref): JSX.Element => {
  const [seconds, setSeconds] = useState<number>(countdownInSeconds);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const timerId = useRef<number>();

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const reset = useCallback(() => {
    setSeconds(countdownInSeconds);
  }, [countdownInSeconds]);

  useImperativeHandle(ref, () => {
    return { resume, pause, reset };
  });

  const countdown = (): string => {
    const absSeconds = Math.abs(seconds);
    const minutesLeft = Math.floor(absSeconds / 60);
    const secondsLeft = absSeconds - minutesLeft * 60;

    return [
      String(minutesLeft).padStart(2, "0"),
      ":",
      String(secondsLeft).padStart(2, "0"),
    ].join("");
  };

  const decreaseCountdownByOneSecond = useCallback(() => {
    setSeconds((secs) => {
      return secs - 1;
    });
  }, []);

  const doCountdown = useCallback(() => {
    decreaseCountdownByOneSecond();
    timerId.current = setTimeout(() => {
      doCountdown();
    }, 1000);
  }, [decreaseCountdownByOneSecond]);

  useEffect(() => {
    return () => clearTimeout(timerId.current);
  }, []);

  useEffect(() => {
    timers?.forEach((timer) => {
      if (timer.timeInSeconds === seconds) {
        timer.onExpire();
      }
    });
  }, [timers, seconds]);

  useEffect(() => {
    setSeconds(countdownInSeconds);
  }, [countdownInSeconds]);

  useEffect(() => {
    if (isPaused) {
      clearTimeout(timerId.current);
    } else {
      doCountdown();
    }
  }, [doCountdown, isPaused]);

  return (
    <>
      <Typography
        variant="bold"
        text={countdown()}
        css={countDownTypographyStyles || css}
      />
      <Typography
        variant="bold"
        text={seconds >= 0 ? "Minutes remaining" : "Over scheduled time"}
        css={minutesRemaningTypographyStyles}
      />
    </>
  );
};

export default React.forwardRef(Countdown);
