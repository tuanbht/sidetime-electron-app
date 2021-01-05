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
