import React, { useState, useRef, useEffect } from "react";
import * as ScreenShare from "../../utils/screenshare";
import { StyledContainer, ParticipantVideoFeed } from "./styles";
import { DesktopCapturerSource } from "electron";
import { LocalVideoTrack, LocalAudioTrack } from "twilio-video";
import { ParticipantPropsType } from "../../types/components/Participant";
import window from "../../utils/window";

const Participant: React.FC<ParticipantPropsType> = ({
  participant,
  local = false,
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
  const [isMicEnabled, setIsMicEnabled] = useState<boolean>(false);
  const [isCamEnabled, setIsCamEnabled] = useState<boolean>(false);
  const [isShareScreenEnabled, setIsShareScreenEnable] = useState<boolean>(
    false
  );

  const trackpubsToTracks = (map: any) => {
    return Array.from(map.values())
      .map((publication: any) => publication.track)
      .filter((track) => track !== null);
  };

  useEffect(() => {
    if (window.platform === "darwin" && local) {
      window.ipc.on(`request-media-access-return`, (_event, isGranted) => {
        setIsCamEnabled(isGranted);
        setIsMicEnabled(isGranted);
      });
      window.ipc.send(`request-media-access`);
    } else {
      setIsMicEnabled(true);
      setIsCamEnabled(true);
    }
  }, [local]);

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

  // local
  useEffect(() => {
    // if(!isCamEnabled) return;
    const videoTrack = videoTracks.length > 1 ? videoTracks[1] : videoTracks[0];
    if (videoTrack) {
      if (isCamEnabled) videoTrack.attach(videoRef.current);
      else videoTrack.detach();
      // videoTrack.attach(videoRef.current);
      // setIsCamEnabled(videoTrack.isEnabled);
      return () => {
        videoTrack.detach();
      };
    }
  }, [isCamEnabled, videoTracks]);

  //local
  useEffect(() => {
    // if(!isMicEnabled) return;
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      if (isMicEnabled) audioTrack.attach(audioRef.current);
      else audioTrack.detach();
      // audioTrack.attach(audioRef.current);
      // setIsMicEnabled(audioTrack.isEnabled);
      return () => {
        audioTrack.detach();
      };
    }
  }, [isMicEnabled, audioTracks]);

  // remote
  useEffect(() => {
    if (audioTracks[0] && audioTracks[0] instanceof LocalAudioTrack) {
      audioTracks[0].enable(isMicEnabled);
    }
  }, [audioTracks, isMicEnabled]);

  // remote
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
      <ParticipantVideoFeed ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} />
      {local ? (
        <div>
          <button onClick={() => setIsMicEnabled(!isMicEnabled)}>
            {isMicEnabled ? "MUTE" : "UNMUTE"}
          </button>
          <button onClick={() => setIsCamEnabled(!isCamEnabled)}>
            {isCamEnabled ? "HIDE" : "SHOW"}
          </button>
        </div>
      ) : null}
      {/* <button onClick={() => setIsShareScreenEnable(!isShareScreenEnabled)}>
        {isShareScreenEnabled ? "HIDE SCREEN" : "SHARE SCREEN"}
      </button> */}
      {/* {desktopSources.map((source) => {
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
      })} */}
    </StyledContainer>
  );
};

export default Participant;
