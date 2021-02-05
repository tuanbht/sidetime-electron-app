import { CallRequestType } from "../types/models";
import { TimerType } from "../types/components/Countdown";

export class Timer {
  id: number;
  callback: () => void;
  start: number;
  remaining: number;

  constructor(callback: () => void, remaining: number) {
    this.callback = callback;
    this.remaining = remaining;
    this.start = Date.now();
    this.id = window.setTimeout(callback, remaining);
  }

  pause() {
    window.clearTimeout(this.id);
    this.remaining -= Date.now() - this.start;
  }

  resume() {
    this.start = Date.now();
    window.clearTimeout(this.id);
    this.id = window.setTimeout(this.callback, this.remaining);
  }
}

export const createTimersForCallRequest = (
  callRequest: CallRequestType | undefined,
  onClosingCallTimerExpired: () => void
): TimerType[] => {
  if (!callRequest) return [];

  const { duration_in_mins } = callRequest;
  const fiveMinLeftTimer = duration_in_mins * 60 - 300; // 300s = 5min
  const tenMinsOvertimeTimer = -600; // 600s = 10min
  const twentyMinsOvertimeTimer = -1200; // 1200s = 20min
  const closeCallTimer = -1230; // 1230 = 20min and 30s

  const onFiveMinutesLeft = () => {
    if (duration_in_mins <= 5) return;
    new Audio(process.env.REACT_APP_FIVE_MIN_WARNING).play();
  };
  const on10MinsOvertime = () => {
    return new Audio(process.env.REACT_APP_TEN_MIN_WARNING).play();
  };
  const on20MinsOvertime = () =>
    new Audio(process.env.REACT_APP_TWENTY_MIN_WARNING).play();

  return [
    { timeInSeconds: fiveMinLeftTimer, onExpire: onFiveMinutesLeft },
    { timeInSeconds: tenMinsOvertimeTimer, onExpire: on10MinsOvertime },
    { timeInSeconds: twentyMinsOvertimeTimer, onExpire: on20MinsOvertime },
    { timeInSeconds: closeCallTimer, onExpire: onClosingCallTimerExpired },
  ];
};
