export const getAudioInputDevices = async (): Promise<MediaDeviceInfo[]> => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter(
    (e) => e.deviceId !== "default" && e.kind === "audioinput"
  );
};

export const createStreamFromInputSource = (
  sourceId: String
): Promise<MediaStream> => {
  const constraints = {
    audio: {
      mandatory: {
        chromeMediaSourceId: sourceId,
      },
    },
    video: false,
  };
  // @ts-ignore
  return navigator.mediaDevices.getUserMedia(constraints);
};
