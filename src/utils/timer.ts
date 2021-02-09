import { CallRequestType } from "../types/models";
import { TimerType } from "../types/components/Countdown";

export type Trigger = {
  seconds?: number;
  minutes?: number;
  repeat?: boolean;
};

export class Timer {
  id: number;
  start: number;
  remaining: number;
  trigger: Trigger;
  callback: () => void;

  constructor(callback: () => void, trigger: Trigger) {
    this.executeCallBack = this.executeCallBack.bind(this);
    this.callback = callback;
    this.trigger = trigger;
    this.remaining = this.calcMiliseconds();
    this.start = Date.now();
    this.id = window.setTimeout(this.executeCallBack, this.remaining);
  }

  pause() {
    window.clearTimeout(this.id);
    this.remaining -= Date.now() - this.start;
  }

  resume() {
    this.start = Date.now();
    window.clearTimeout(this.id);
    this.id = window.setTimeout(this.executeCallBack, this.remaining);
  }

  clear() {
    window.clearTimeout(this.id);
  }

  executeCallBack() {
    this.callback();
    if (this.trigger.repeat) {
      this.resume();
    }
  }

  calcMiliseconds() {
    let miliseconds = 0;

    miliseconds += this.trigger.seconds ? this.trigger.seconds * 1000 : 0;
    miliseconds += this.trigger.minutes ? this.trigger.minutes * 60000 : 0;

    return miliseconds;
  }
}

export const createTimersForCallRequest = (
  callRequest: CallRequestType | undefined,
  onClosingCallTimerExpired: () => void
): TimerType[] => {
  if (!callRequest) return [];

  const { duration_in_mins } = callRequest;
  const fiveMinLeftTimer = 300; // +300s = 5 min left
  const tenMinsOvertimeTimer = -600; // -600s = 10 min overtime
  const twentyMinsOvertimeTimer = -1200; // -1200s = 20 min overtime
  const closeCallTimer = -1230; // -1230 = 20 min and 30s overtime

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
