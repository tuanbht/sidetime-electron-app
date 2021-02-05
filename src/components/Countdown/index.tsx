import React, { useCallback, useEffect, useRef, useState } from "react";
import Typography from "../Typography";
import { CountdownPropsType } from "../../types/components/Countdown";
import { countDownTypographyStyles } from "./styles";

const CountDown: React.FC<CountdownPropsType> = ({
  css,
  countdownInSeconds,
  timers,
}) => {
  const [seconds, setSeconds] = useState<number>(countdownInSeconds);
  const timerId = useRef<number>();

  const countdown = (): string => {
    const absSeconds = Math.abs(seconds);
    const minutesLeft = Math.floor(absSeconds / 60);
    const secondsLeft = absSeconds - minutesLeft * 60;

    return [
      seconds < 0 ? "+ " : "",
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
    doCountdown();
    return () => clearTimeout(timerId.current);
  }, [doCountdown]);

  useEffect(() => {
    timers?.forEach((timer) => {
      if (timer.timeInSeconds === seconds) {
        timer.onExpire();
      }
    });
  }, [timers, seconds]);

  return (
    <Typography
      variant="bold"
      text={countdown()}
      css={countDownTypographyStyles || css}
    />
  );
};

export default CountDown;
