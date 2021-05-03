import React, { useState, useMemo, useEffect, useRef } from "react";
import cameraPlaceholder from "../../../../assets/camera.png";
import Button from "../../../../components/Button";
import Countdown from "../../../../components/Countdown";
import HorizontalDivider from "../../../../components/HorizontalDivider";
import CallSettings from "./CallSettings";
import Modal, { ModalInterface } from "../../../../components/Modal";
import RequestScreenshareModal from "./RequestScreenshareModal";
import window from "../../../../utils/window";
import * as ScreenShare from "../../../../utils/screenshare";
import { StrongTypedMap } from "../../../../types/map";
import { LocalParticipantPropsType } from "../../../../types/screens/CallRequest";
import { ReactComponent as MessageCircleOff } from "../../../../assets/comments-off.svg";
import { ReactComponent as MonitorOff } from "../../../../assets/screenshare-off.svg";
import { DesktopCapturerSource } from "electron";
import { LocalVideoTrack, LocalAudioTrack } from "twilio-video";
import { createTimersForCallRequest } from "../../../../utils/timer";
import { createStreamFromInputSource } from "../../../../utils/virtualCable";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MessageCircle,
  Settings,
  X,
  Icon as IconType,
} from "react-feather";
import {
  StyledContainer,
  CallContainer,
  TopContainer,
  BottomContainer,
  LeftContainer,
  CenterContainer,
  CenterActionsContainer,
  RightContainer,
  CounterContainer,
  CommentsContainer,
  CommentInputContainer,
  CommentsListContainer,
  ScreensContainer,
  Screen,
  CameraPlaceholder,
  Camera,
  endCallButtonStyles,
  onActionButtonStyles,
  onActionIconStyles,
  offActionButtonStyles,
  offActionIconStyles,
} from "./styles";

interface ActionButtonState {
  on: IconType | string;
  off: IconType | string;
}

interface ActionButton {
  mic: ActionButtonState;
  cam: ActionButtonState;
  screen: ActionButtonState;
  comments: ActionButtonState;
  settings: ActionButtonState;
}

type ActionButtonMap = StrongTypedMap<
  ActionButton,
  keyof ActionButton,
  ActionButtonState
>;

const LocalParticipant: React.FC<LocalParticipantPropsType> = (props) => {
  const {
    participant,
    callRequest,
    countdownRef,
    onCallEnded,
    onEndCallButtonClick,
  } = props;

  const [isMicEnabled, setIsMicEnabled] = useState<boolean>(false);
  const [isCamEnabled, setIsCamEnabled] = useState<boolean>(false);
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [isSettingsEnabled, setIsSettingsEnabled] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isShowingComments, setIsShowingComments] = useState<boolean>(false);
  const [screens, setScreens] = useState<DesktopCapturerSource[]>([]);

  const [micTrack, setMicTrack] = useState<LocalAudioTrack>();
  const [cableTrack, setCableTrack] = useState<LocalAudioTrack>();
  const [cameraTrack, setCameraTrack] = useState<LocalVideoTrack>();
  const [screenTrack, setScreenTrack] = useState<LocalVideoTrack>();

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const requestScreenModal = useRef<ModalInterface>(null);

  const icons: ActionButtonMap = {
    mic: { on: Mic, off: MicOff },
    cam: { on: Video, off: VideoOff },
    screen: { on: Monitor, off: MonitorOff },
    comments: { on: MessageCircleOff, off: MessageCircle },
    settings: { on: Settings, off: X },
  };

  const callDurantionInSecondsLeft = () => {
    const { duration_in_mins, minutes_used } = callRequest || {};

    if (duration_in_mins === undefined || minutes_used === undefined) return 0;

    return (duration_in_mins - minutes_used) * 60;
  };

  const getScreenThumbnail = (screen: DesktopCapturerSource): string => {
    if (!screen.thumbnail?.isEmpty()) return screen.thumbnail?.toDataURL();
    if (!screen.appIcon?.isEmpty()) return screen.appIcon?.toDataURL();
    return "";
  };

  const onScreenshare = async () => {
    if (window.platform === "darwin") {
      const isGranted = await window.ipc.invoke(
        "is-screenshare-access-granted"
      );
      if (!isGranted) {
        requestScreenModal.current?.open();
        return;
      }
    }

    setIsSharing(!isSharing);
  };

  const onScreenSelect = async (source: DesktopCapturerSource) => {
    const stream = await ScreenShare.createStreamFromDesktopCapturerSources(
      source
    );

    if (!stream || stream.getTracks().length === 0) return;
    const track = new LocalVideoTrack(stream.getTracks()[0]);

    participant?.publishTrack(track);
    setScreenTrack(track);
    setScreens([]);
  };

  const onCableSelect = async (deviceId: String) => {
    const stream = await createStreamFromInputSource(deviceId);

    if (!stream || stream.getTracks().length === 0) return;
    const track = new LocalAudioTrack(stream.getTracks()[0]);

    participant?.publishTrack(track);
    setCableTrack(track);
  };

  const onCableDetach = () => {
    if (!cableTrack) return;
    participant?.unpublishTrack(cableTrack);
    setCableTrack(undefined);
  };

  useEffect(() => {
    if (!participant) return;

    setMicTrack(Array.from(participant.audioTracks.values())[0].track);
    setCameraTrack(Array.from(participant.videoTracks.values())[0].track);
  }, [participant]);

  useEffect(() => {
    return () => {
      participant?.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    if (!micTrack || !isMicEnabled) return;

    // @ts-ignore
    micTrack.attach(audioRef.current);

    return () => {
      micTrack.detach();
    };
  }, [isMicEnabled, micTrack]);

  useEffect(() => {
    if (!cameraTrack || !isCamEnabled) return;

    // @ts-ignore
    cameraTrack.attach(videoRef.current);

    return () => {
      cameraTrack.detach();
    };
  }, [isCamEnabled, cameraTrack]);

  useEffect(() => {
    micTrack?.enable(isMicEnabled);
  }, [micTrack, isMicEnabled]);

  useEffect(() => {
    cameraTrack?.enable(isCamEnabled);
  }, [cameraTrack, isCamEnabled]);

  useEffect(() => {
    if (!isSharing) {
      if (screenTrack) {
        participant?.unpublishTrack(screenTrack);
        setScreenTrack(undefined);
      }

      setScreens([]);
      return;
    }

    ScreenShare.getDesktopCapturerSources().then((sources) => {
      sources.length === 1 ? onScreenSelect(sources[0]) : setScreens(sources);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSharing]);

  useEffect(() => {
    if (window.platform === "darwin") {
      window.ipc.on(`request-media-access-return`, (_event, isGranted) => {
        setIsCamEnabled(isGranted);
        setIsMicEnabled(isGranted);
      });
      window.ipc.send(`request-media-access`);
    } else {
      setIsMicEnabled(true);
      setIsCamEnabled(true);
    }
  }, []);

  const comments = useMemo(() => {
    return (
      <>
        <CommentsListContainer></CommentsListContainer>
        <HorizontalDivider />
        <CommentInputContainer></CommentInputContainer>
      </>
    );
  }, []);

  const renderActionButton = (
    icon: keyof ActionButton,
    active: boolean,
    onClick: () => void
  ) => {
    const Icon = active ? icons[icon].off : icons[icon].on;
    const iconStyle = active ? offActionIconStyles : onActionIconStyles;
    const buttonStyle = active ? offActionButtonStyles : onActionButtonStyles;
    return (
      <Button
        icon={<Icon size={40} style={iconStyle} />}
        onClick={onClick}
        css={buttonStyle}
      />
    );
  };

  const renderScreens = () => {
    if (screens.length <= 0) return;

    return (
      <ScreensContainer>
        {screens.map((screen) => (
          <Screen
            key={screen.id}
            src={getScreenThumbnail(screen)}
            onClick={() => {
              onScreenSelect(screen);
            }}
          />
        ))}
      </ScreensContainer>
    );
  };

  const renderSettings = () => {
    if (!isSettingsEnabled) return null;
    if (!cameraTrack || !cameraTrack.mediaStreamTrack) return null;
    if (!micTrack || !micTrack.mediaStreamTrack) return null;

    return (
      <CallSettings
        webcamMediaStreamTrack={cameraTrack.mediaStreamTrack}
        onVirtualCableSelect={onCableSelect}
        onVirtualCableDetach={onCableDetach}
        attachedDeviceLabel={cableTrack?.mediaStreamTrack.label}
      />
    );
  };

  return (
    <StyledContainer>
      <CallContainer>
        <TopContainer>
          {cameraTrack && isCamEnabled ? (
            <Camera ref={videoRef} autoPlay={true} />
          ) : (
            <CameraPlaceholder src={cameraPlaceholder} />
          )}
          {micTrack && isMicEnabled ? (
            <audio ref={audioRef} autoPlay={true} />
          ) : null}
        </TopContainer>
        <BottomContainer>
          <LeftContainer>
            <CounterContainer>
              {callRequest ? (
                <Countdown
                  ref={countdownRef}
                  countdownInSeconds={callDurantionInSecondsLeft()}
                  timers={createTimersForCallRequest(
                    callRequest,
                    onCallEnded || (() => {})
                  )}
                />
              ) : null}
              <Button
                text="END CALL"
                onClick={onEndCallButtonClick || (() => {})}
                css={endCallButtonStyles}
              />
            </CounterContainer>
          </LeftContainer>
          <CenterContainer>
            {renderScreens()}
            {renderSettings()}
            <CenterActionsContainer>
              {renderActionButton("mic", isMicEnabled, () =>
                setIsMicEnabled(!isMicEnabled)
              )}
              {renderActionButton("cam", isCamEnabled, () =>
                setIsCamEnabled(!isCamEnabled)
              )}
              {renderActionButton("screen", isSharing, onScreenshare)}
              {renderActionButton("settings", isSettingsEnabled, () =>
                setIsSettingsEnabled(!isSettingsEnabled)
              )}
            </CenterActionsContainer>
          </CenterContainer>
          <RightContainer>
            {/* {renderActionButton("comments", isShowingComments, () =>
              setIsShowingComments(!isShowingComments)
            )} */}
          </RightContainer>
        </BottomContainer>
      </CallContainer>
      {isShowingComments ? (
        <CommentsContainer>{comments}</CommentsContainer>
      ) : null}
      <Modal ref={requestScreenModal}>
        <RequestScreenshareModal onDone={() => onScreenshare()} />
      </Modal>
    </StyledContainer>
  );
};

export default LocalParticipant;
