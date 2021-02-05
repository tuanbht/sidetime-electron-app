import React, { useState, useMemo, useEffect, useRef } from "react";
import cameraPlaceholder from "../../../../assets/camera.png";
import Button from "../../../../components/Button";
import Typography from "../../../../components/Typography";
import Countdown from "../../../../components/Countdown";
import HorizontalDivider from "../../../../components/HorizontalDivider";
import useAppContext from "../../../../hooks/useAppContext";
import window from "../../../../utils/window";
import * as ScreenShare from "../../../../utils/screenshare";
import { StrongTypedMap } from "../../../../types/map";
import { LocalParticipantPropsType } from "../../../../types/screens/CallRequest";
import { ReactComponent as MessageCircleOff } from "../../../../assets/comments-off.svg";
import { ReactComponent as MonitorOff } from "../../../../assets/screenshare-off.svg";
import { useHistory } from "react-router-dom";
import { DesktopCapturerSource } from "electron";
import { LocalVideoTrack, LocalAudioTrack } from "twilio-video";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MessageCircle,
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
  minutesRemaningTypographyStyles,
  endCallButtonStyles,
  onActionButtonStyles,
  onActionIconStyles,
  offActionButtonStyles,
  offActionIconStyles,
} from "./styles";
import { createTimersForCallRequest } from "../../../../utils/timer";

interface ActionButtonState {
  on: IconType | string;
  off: IconType | string;
}

interface ActionButton {
  mic: ActionButtonState;
  cam: ActionButtonState;
  screen: ActionButtonState;
  comments: ActionButtonState;
}

type ActionButtonMap = StrongTypedMap<
  ActionButton,
  keyof ActionButton,
  ActionButtonState
>;

const LocalParticipant: React.FC<LocalParticipantPropsType> = (props) => {
  const { participant, callRequest } = props;
  const { callRequestStore } = useAppContext();

  const [isMicEnabled, setIsMicEnabled] = useState<boolean>(false);
  const [isCamEnabled, setIsCamEnabled] = useState<boolean>(false);
  const [isSharing, setIsSharing] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isShowingComments, setIsShowingComments] = useState<boolean>(false);
  const [screens, setScreens] = useState<DesktopCapturerSource[]>([]);

  const [micTrack, setMicTrack] = useState<LocalAudioTrack>();
  const [cameraTrack, setCameraTrack] = useState<LocalVideoTrack>();
  const [screenTrack, setScreenTrack] = useState<LocalVideoTrack>();

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const history = useHistory();

  const icons: ActionButtonMap = {
    mic: { on: Mic, off: MicOff },
    cam: { on: Video, off: VideoOff },
    screen: { on: Monitor, off: MonitorOff },
    comments: { on: MessageCircleOff, off: MessageCircle },
  };

  const callDurantionInSecondsLeft = () => {
    const { duration_in_mins, minutes_used } = callRequest || {};

    if (duration_in_mins === undefined || minutes_used === undefined) return 0;

    return (duration_in_mins - minutes_used) * 60;
  };

  const onClosingCallTimerExpired = () => {
    callRequestStore.setCallRequest(undefined);
    history.push("/call_requests");
  };

  const onScreenSelect = async (source: DesktopCapturerSource) => {
    const stream = await ScreenShare.createStreamFromDesktopCapturerSources(
      source
    );

    if (!stream || stream.getTracks().length === 0) return;
    const track = new LocalVideoTrack(stream.getTracks()[0]);

    if (cameraTrack) participant?.unpublishTrack(cameraTrack);
    participant?.publishTrack(track);
    setScreenTrack(track);
    setScreens([]);
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

        if (!cameraTrack?.mediaStreamTrack) return;

        const track = new LocalVideoTrack(cameraTrack.mediaStreamTrack);

        participant?.unpublishTrack(cameraTrack);
        participant?.publishTrack(track);
        setCameraTrack(track);
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
    const Icon = active ? icons[icon].on : icons[icon].off;
    const iconStyle = active ? onActionIconStyles : offActionIconStyles;
    const buttonStyle = active ? onActionButtonStyles : offActionButtonStyles;
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
            src={screen.thumbnail.toDataURL()}
            onClick={() => {
              onScreenSelect(screen);
            }}
          />
        ))}
      </ScreensContainer>
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
              <Countdown
                countdownInSeconds={callDurantionInSecondsLeft()}
                timers={createTimersForCallRequest(
                  callRequest,
                  onClosingCallTimerExpired
                )}
              />
              <Typography
                variant="bold"
                text="Minutes remaining"
                css={minutesRemaningTypographyStyles}
              />
              <Button
                text="END CALL"
                onClick={() => {
                  callRequestStore.setCallRequest(undefined);
                  history.push("/call_requests");
                }}
                css={endCallButtonStyles}
              />
            </CounterContainer>
          </LeftContainer>
          <CenterContainer>
            {renderScreens()}
            <CenterActionsContainer>
              {renderActionButton("mic", isMicEnabled, () =>
                setIsMicEnabled(!isMicEnabled)
              )}
              {renderActionButton("cam", isCamEnabled, () =>
                setIsCamEnabled(!isCamEnabled)
              )}
              {renderActionButton("screen", isSharing, () =>
                setIsSharing(!isSharing)
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
    </StyledContainer>
  );
};

export default LocalParticipant;
