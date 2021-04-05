import React, { useState, useEffect, useRef } from "react";
import { RemoteParticipantPropsType } from "../../../../types/screens/CallRequest";
import {
  RemoteAudioTrack,
  RemoteAudioTrackPublication,
  RemoteVideoTrack,
  RemoteVideoTrackPublication,
} from "twilio-video";
import { StyledContainer, RemoteVideo, RemoteWebCam } from "./styles";

const RemoteParticipant: React.FC<RemoteParticipantPropsType> = (props) => {
  const { participant } = props;
  const [audioTrack, setAudioTrack] = useState<RemoteAudioTrack | null>();
  const [cableTrack, setCableTrack] = useState<RemoteAudioTrack | null>();
  const [videoTrack, setVideoTrack] = useState<RemoteVideoTrack | null>();
  const [screenTrack, setScreenTrack] = useState<RemoteVideoTrack | null>();
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const remoteScreenRef = useRef<HTMLVideoElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const remoteCableAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!participant) return;

    participant?.on(
      "trackSubscribed",
      (track: RemoteVideoTrack | RemoteAudioTrack) => {
        if (track.kind === "audio") {
          setAudioTrack((current: RemoteAudioTrack | null | undefined) => {
            if (current) {
              setCableTrack(track);
              return current;
            } else return track;
          });
        } else if (track.kind === "video") {
          setVideoTrack((current: RemoteVideoTrack | null | undefined) => {
            if (current) {
              setScreenTrack(track);
              return current;
            } else return track;
          });
        }
      }
    );

    participant?.on(
      "trackUnsubscribed",
      (track: RemoteAudioTrack | RemoteVideoTrack) => {
        [setAudioTrack, setCableTrack, setVideoTrack, setScreenTrack].forEach(
          (fun) => {
            fun((current: any) => {
              if (track.sid === current?.sid) return undefined;
              return current;
            });
          }
        );
      }
    );

    participant.on(
      "trackDisabled",
      (pub: RemoteAudioTrackPublication | RemoteVideoTrackPublication) => {
        if (pub.kind === "audio") setAudioTrack(null);
        else if (pub.kind === "video") setVideoTrack(null);
      }
    );

    participant.on(
      "trackEnabled",
      (pub: RemoteAudioTrackPublication | RemoteVideoTrackPublication) => {
        if (pub.kind === "audio") setAudioTrack(pub.track);
        else if (pub.kind === "video") setVideoTrack(pub.track);
      }
    );

    return () => {
      participant?.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    if (!audioTrack) return;

    // @ts-ignore
    audioTrack.attach(remoteAudioRef.current);

    return () => {
      audioTrack.detach();
    };
  }, [audioTrack]);

  useEffect(() => {
    if (!videoTrack) return;

    // @ts-ignore
    videoTrack.attach(remoteVideoRef.current);

    return () => {
      videoTrack.detach();
    };
  }, [videoTrack, screenTrack]);

  useEffect(() => {
    if (!screenTrack) return;

    // @ts-ignore
    screenTrack.attach(remoteScreenRef.current);

    return () => {
      screenTrack.detach();
    };
  }, [screenTrack]);

  useEffect(() => {
    if (!cableTrack) return;

    // @ts-ignore
    cableTrack.attach(remoteCableAudioRef.current);

    return () => {
      cableTrack.detach();
    };
  }, [cableTrack]);

  const renderScreenShareView = () => {
    if (!screenTrack) return null;
    return <RemoteVideo ref={remoteScreenRef} autoPlay={true} />;
  };

  const renderWebCamView = () => {
    if (!videoTrack || screenTrack) return null;
    return <RemoteVideo ref={remoteVideoRef} autoPlay={true} />;
  };

  const renderScreenSharingWebCamView = () => {
    if (!screenTrack || !videoTrack?.isEnabled) return null;
    return <RemoteWebCam ref={remoteVideoRef} autoPlay={true} />;
  };

  return (
    <StyledContainer>
      {renderScreenShareView()}
      {renderWebCamView()}
      {renderScreenSharingWebCamView()}
    </StyledContainer>
  );
};

export default RemoteParticipant;
