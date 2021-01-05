import { IpcRenderer, DesktopCapturer } from "electron";

export type ComposedWindow = Window &
  typeof globalThis & {
    ipc: IpcRenderer;
    desktopCapturer: DesktopCapturer;
  };
