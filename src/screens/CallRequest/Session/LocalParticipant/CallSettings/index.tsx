import React, { useState } from "react";
import Typography from "../../../../../components/Typography";
import { CallSettingsPropsType } from "../../../../../types/screens/CallRequest";
import {
  getMediaStreamTrackCapabilities,
  getMediaStreamTrackSettings,
} from "../../../../../utils/screenshare";
import {
  SettingsContainer,
  ConstrastSliderContainer,
  ContrastSlider,
  contrastSliderInputLabelTypographyStyles,
  settingsTypographyStyles,
} from "./styles";

const CallSettings: React.FC<CallSettingsPropsType> = (props) => {
  const { webcamMediaStreamTrack } = props;
  const track = webcamMediaStreamTrack;
  const settings = getMediaStreamTrackSettings(track);
  const { brightness } = getMediaStreamTrackCapabilities(track);
  const [currentBrightness, setCurrentBrightness] = useState<number>(
    settings.brightness || 0
  );

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
          css={contrastSliderInputLabelTypographyStyles}
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
    </SettingsContainer>
  );
};

export default CallSettings;
