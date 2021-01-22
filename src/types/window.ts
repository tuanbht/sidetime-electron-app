import { IpcRenderer, DesktopCapturer } from "electron";

export type ComposedWindowType = Window &
  typeof globalThis & {
    ipc: IpcRenderer;
    desktopCapturer: DesktopCapturer;
  };
