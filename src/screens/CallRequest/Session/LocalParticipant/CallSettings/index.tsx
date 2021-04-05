import React, { useEffect, useState } from "react";
import Input from "../../../../../components/Input";
import Typography from "../../../../../components/Typography";
import { v4 as uuidv4 } from "uuid";
import { CallSettingsPropsType } from "../../../../../types/screens/CallRequest";
import {
  getMediaStreamTrackCapabilities,
  getMediaStreamTrackSettings,
} from "../../../../../utils/screenshare";
import {
  SettingsContainer,
  ConstrastSliderContainer,
  VirtualCableContainer,
  ContrastSlider,
  InputDeviceOption,
  labelTypographyStyles,
  settingsTypographyStyles,
  detachButtonTypographyStyles,
} from "./styles";
import { getAudioInputDevices } from "../../../../../utils/virtualCable";
import Button from "../../../../../components/Button";

const CallSettings: React.FC<CallSettingsPropsType> = (props) => {
  const {
    webcamMediaStreamTrack,
    onVirtualCableSelect,
    onVirtualCableDetach,
    attachedDeviceLabel,
  } = props;
  const track = webcamMediaStreamTrack;
  const settings = getMediaStreamTrackSettings(track);
  const { brightness } = getMediaStreamTrackCapabilities(track);

  const [currentBrightness, setCurrentBrightness] = useState<number>(
    settings.brightness || 0
  );
  const [inputsDevices, setInputDevices] = useState<MediaDeviceInfo[]>([]);

  const getSelectorValue = () => {
    const id = inputsDevices.find((e) => e.label === attachedDeviceLabel)
      ?.deviceId;
    return id || "";
  };

  useEffect(() => {
    getAudioInputDevices().then((devices) => {
      setInputDevices(devices);
    });
  }, []);
  return (
    <SettingsContainer>
      <Typography
        variant="bold"
        text="Settings"
        css={settingsTypographyStyles}
      />
      <ConstrastSliderContainer>
        <Typography
          variant="regular"
          text={`Contrast${!brightness ? "(Not supported)" : ""}`}
          css={labelTypographyStyles}
        />
        {brightness && (
          <ContrastSlider
            type="range"
            disabled={!brightness}
            onChange={(event) => {
              setCurrentBrightness(parseInt(event.currentTarget.value));
              track.applyConstraints({
                // @ts-ignore
                advanced: [{ brightness: event.target.value }],
              });
            }}
            value={currentBrightness}
            step={brightness?.min}
            min={brightness?.min}
            max={brightness?.max}
          />
        )}
      </ConstrastSliderContainer>
      <VirtualCableContainer>
        <Typography
          variant="regular"
          text="Virtual Cable"
          css={labelTypographyStyles}
        />
        <Input
          type="select"
          onChange={onVirtualCableSelect}
          value={getSelectorValue()}
        >
          <InputDeviceOption key={uuidv4()} value="">
            Detached(Not in use)
          </InputDeviceOption>
          {inputsDevices.map((e) => {
            return (
              <InputDeviceOption key={uuidv4()} value={e.deviceId}>
                {e.label}
              </InputDeviceOption>
            );
          })}
        </Input>
        <Button
          onClick={onVirtualCableDetach}
          disabled={!attachedDeviceLabel}
          text="Detach"
          css={detachButtonTypographyStyles}
        />
      </VirtualCableContainer>
    </SettingsContainer>
  );
};

export default CallSettings;
