import React, { useState, useEffect, useRef } from "react";
import { RemoteParticipantPropsType } from "../../../../types/screens/CallRequest";
import {
  RemoteAudioTrack,
  RemoteAudioTrackPublication,
  RemoteVideoTrack,
  RemoteVideoTrackPublication,
} from "twilio-video";
import { StyledContainer, RemoteVideo } from "./styles";

const RemoteParticipant: React.FC<RemoteParticipantPropsType> = (props) => {
  const { participant } = props;
  const [audioTrack, setAudioTrack] = useState<RemoteAudioTrack | null>();
  const [videoTrack, setVideoTrack] = useState<RemoteVideoTrack | null>();
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!participant) return;

    participant?.on(
      "trackSubscribed",
      (track: RemoteVideoTrack | RemoteAudioTrack) => {
        if (track.kind === "audio") setAudioTrack(track);
        else if (track.kind === "video") setVideoTrack(track);
      }
    );

    participant?.on(
      "trackUnsubscribed",
      (track: RemoteVideoTrack | RemoteAudioTrack) => {
        if (track.kind === "audio") setAudioTrack(undefined);
        else if (track.kind === "video") setVideoTrack(undefined);
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
  }, [videoTrack]);

  if (!videoTrack?.isEnabled) return null;
  return (
    <StyledContainer>
      {/* @ts-ignore */}
      <RemoteVideo ref={remoteVideoRef} autoPlay={true} />
    </StyledContainer>
  );
};

export default RemoteParticipant;
