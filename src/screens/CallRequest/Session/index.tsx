import React, { useState, useEffect } from "react";
import Typography from "../../../components/Typography";
import LocalParticipant from "./LocalParticipant";
import RemoteParticipant from "./RemoteParticipant";
import useAppContext from "../../../hooks/useAppContext";
import logo from "../../../assets/logo.png";
import { CallRequestSessionScreenPropsType } from "../../../types/screens/CallRequest";
import {
  StyledContainer,
  LogoContainer,
  Logo,
  poweredByTypographyStyles,
} from "./styles";
import Video, {
  Room,
  Participant as ParticipantType,
  LocalParticipant as LocalParticipantType,
  RemoteParticipant as RemoteParticipantType,
  LocalDataTrack,
} from "twilio-video";

const CallRequestSessionScreen: React.FC<CallRequestSessionScreenPropsType> = (
  props
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [room, setRoom] = useState<Room | null>();
  const [
    remoteParticipant,
    setRemoteParticipant,
  ] = useState<RemoteParticipantType>();
  const [
    localParticipant,
    setLocalParticipant,
  ] = useState<LocalParticipantType>();
  const {
    callRequestStore: { callRequest },
    callRequestStore,
  } = useAppContext();

  const onParticipantConnected = (participant: RemoteParticipantType) => {
    setRemoteParticipant(participant);
  };

  const onParticipantDisconnected = (_participant: ParticipantType) => {
    setRemoteParticipant(undefined);
  };

  useEffect(() => {
    if (!callRequest) return;

    callRequestStore.createTwilioToken().then((token) => {
      Video.connect(token, { name: callRequest.slug }).then((room) => {
        setRoom(room);
        setLocalParticipant(room.localParticipant);
        room.on("participantConnected", onParticipantConnected);
        room.on("participantDisconnected", onParticipantDisconnected);
        room.participants.forEach(onParticipantConnected);
      });
    });

    return () => {
      setRoom((room) => {
        if (!room || room.localParticipant.state !== "connected") return room;
        room.localParticipant.tracks.forEach((trackPublication) => {
          if (trackPublication.track instanceof LocalDataTrack) return;
          trackPublication.track.stop();
        });
        room.disconnect();
        return null;
      });
    };
  }, [callRequestStore, callRequest]);

  return (
    <StyledContainer>
      <LogoContainer>
        <Typography
          variant="bold"
          text="Powered by"
          css={poweredByTypographyStyles}
        />
        <Logo src={logo} />
      </LogoContainer>
      {remoteParticipant ? (
        <RemoteParticipant
          participant={remoteParticipant}
          callRequest={callRequest}
        />
      ) : null}
      <LocalParticipant
        participant={localParticipant}
        callRequest={callRequest}
      />
    </StyledContainer>
  );
};

export default CallRequestSessionScreen;
