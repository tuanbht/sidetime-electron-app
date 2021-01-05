import { DesktopCapturerSource } from "electron";
import window from "./window";

export const getDesktopCapturerSources = (): Promise<
  Electron.DesktopCapturerSource[]
> => {
  return window.desktopCapturer.getSources({ types: ["screen"] });
};

export const createStreamFromDesktopCapturerSources = (
  source: DesktopCapturerSource
): Promise<MediaStream> => {
  const constraints = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: source.id,
      },
    },
  };
  // @ts-ignore
  return navigator.mediaDevices.getUserMedia(constraints);
};
