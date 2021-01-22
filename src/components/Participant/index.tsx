import React, { useState, useRef, useEffect } from "react";
import * as ScreenShare from "../../utils/screenshare";
import { StyledContainer } from "./styles";
import { DesktopCapturerSource } from "electron";
import { LocalVideoTrack, LocalAudioTrack } from "twilio-video";
import { ParticipantPropsType } from "../../types/components/Participant";

const Participant: React.FC<ParticipantPropsType> = ({
  participant,
  onScreenShare,
}) => {
  const [videoTracks, setVideoTracks] = useState<any[]>([]);
  const [audioTracks, setAudioTracks] = useState<any[]>([]);
  const [desktopSources, setDesktopSources] = useState<DesktopCapturerSource[]>(
    []
  );
  const [desktopVideoTrack, setDesktopVideoTrack] = useState<LocalVideoTrack>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMicEnabled, setIsMicEnabled] = useState<boolean>(true);
  const [isCamEnabled, setIsCamEnabled] = useState<boolean>(true);
  const [isShareScreenEnabled, setIsShareScreenEnable] = useState<boolean>(
    false
  );

  const trackpubsToTracks = (map: any) => {
    return Array.from(map.values())
      .map((publication: any) => publication.track)
      .filter((track) => track !== null);
  };

  useEffect(() => {
    const trackSubscribed = (track: any) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track: any) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks.length > 1 ? videoTracks[1] : videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      setIsCamEnabled(videoTrack.isEnabled);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      setIsMicEnabled(audioTrack.isEnabled);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  useEffect(() => {
    if (audioTracks[0] && audioTracks[0] instanceof LocalAudioTrack) {
      audioTracks[0].enable(isMicEnabled);
    }
  }, [audioTracks, isMicEnabled]);

  useEffect(() => {
    if (videoTracks[0] && videoTracks[0] instanceof LocalVideoTrack) {
      videoTracks[0].enable(isCamEnabled);
    }
  }, [videoTracks, isCamEnabled]);

  useEffect(() => {
    if (!isShareScreenEnabled) {
      desktopVideoTrack?.stop();
      setDesktopVideoTrack(undefined);
    } else {
      ScreenShare.getDesktopCapturerSources().then((sources) => {
        setDesktopSources(sources);
      });
    }
  }, [desktopVideoTrack, isShareScreenEnabled]);

  return (
    <StyledContainer>
      <h3>{participant.identity}</h3>
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} />
      <button onClick={() => setIsMicEnabled(!isMicEnabled)}>
        {isMicEnabled ? "MUTE" : "UNMUTE"}
      </button>
      <button onClick={() => setIsCamEnabled(!isCamEnabled)}>
        {isCamEnabled ? "HIDE" : "SHOW"}
      </button>
      <button onClick={() => setIsShareScreenEnable(!isShareScreenEnabled)}>
        {isShareScreenEnabled ? "HIDE SCREEN" : "SHARE SCREEN"}
      </button>
      {desktopSources.map((source) => {
        return (
          <div
            onClick={async () => {
              const stream = await ScreenShare.createStreamFromDesktopCapturerSources(
                source
              );
              const track = new LocalVideoTrack(stream.getTracks()[0]);

              if (onScreenShare) onScreenShare(track);
              setDesktopVideoTrack(track);
              setIsShareScreenEnable(true);
              setDesktopSources([]);
            }}
          >
            <img src={source.thumbnail.toDataURL()} alt="" />
            <br />
          </div>
        );
      })}
    </StyledContainer>
  );
};

export default Participant;
