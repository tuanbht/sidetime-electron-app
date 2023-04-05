import React, { useState, useEffect, useCallback, useRef } from "react";
import Typography from "../../../components/Typography";
import LocalParticipant from "./LocalParticipant";
import RemoteParticipant from "./RemoteParticipant";
import useAppContext from "../../../hooks/useAppContext";
import logo from "../../../assets/logo.png";
import { CallRequestType } from "../../../types/models";
import { useHistory, useParams } from "react-router-dom";
import {
  CallRequestSessionScreenPropsType,
  CallRequestSessionScreenRouteParams,
} from "../../../types/screens/CallRequest";
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
import { CountdownInterface } from "../../../components/Countdown";

const CallRequestSessionScreen: React.FC<CallRequestSessionScreenPropsType> = (
  props
) => {
  const [
    localParticipant,
    setLocalParticipant,
  ] = useState<LocalParticipantType>();
  const [
    remoteParticipant,
    setRemoteParticipant,
  ] = useState<RemoteParticipantType>();
  const [room, setRoom] = useState<Room>();
  const [callRequest, setCallRequest] = useState<CallRequestType>();
  const countdownRef = useRef<CountdownInterface>(null);
  const params = useParams<CallRequestSessionScreenRouteParams>();
  const history = useHistory();
  const { callRequestStore } = useAppContext();

  const onParticipantConnected = useCallback(
    (participant: RemoteParticipantType) => {
      setRemoteParticipant(participant);

      if (!callRequest) return;
      callRequestStore.setCallRequestAsStarted(callRequest).then((e) => {
        setCallRequest(e);
        countdownRef.current?.reset();
        countdownRef.current?.resume();
      });
    },
    [callRequest, callRequestStore]
  );

  const onParticipantDisconnected = useCallback(
    (_participant: ParticipantType) => {
      setRemoteParticipant(undefined);

      if (!callRequest) return;
      callRequestStore.setCallRequestAsPaused(callRequest).then(() => {
        countdownRef.current?.pause();
      });
    },
    [callRequest, callRequestStore]
  );

  const unpublishTracksAndDisconnect = useCallback(() => {
    if (!room) return;

    const {
      localParticipant: { state, tracks },
    } = room;
    if (state !== "connected") return;

    tracks.forEach((publication) => {
      if (publication.track instanceof LocalDataTrack) return;
      publication.track.stop();
    });

    room.disconnect();
  }, [room]);

  const onEndCallButtonClick = useCallback(() => {
    unpublishTracksAndDisconnect();
    history.push("/call_requests");
  }, [history, unpublishTracksAndDisconnect]);

  useEffect(() => {
    if (!params.slug) return;

    callRequestStore.fetchCallRequest(params.siteSlug, params.slug).then((callRequest) => {
      setCallRequest(callRequest);
    });
  }, [callRequestStore, params.slug, params.siteSlug]);

  useEffect(() => {
    if (!callRequest || room !== undefined) return;

    callRequestStore.createTwilioToken(callRequest).then((token) => {
      Video.connect(token, { name: callRequest.slug }).then((room) => {
        setRoom(room);
        setLocalParticipant(room.localParticipant);
        room.on("participantConnected", onParticipantConnected);
        room.on("participantDisconnected", onParticipantDisconnected);
        room.participants.forEach(onParticipantConnected);
      });
    });
  }, [
    onParticipantConnected,
    onParticipantDisconnected,
    callRequestStore,
    callRequest,
    room,
  ]);

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
        countdownRef={countdownRef}
        onCallEnded={onEndCallButtonClick}
        onEndCallButtonClick={onEndCallButtonClick}
      />
    </StyledContainer>
  );
};

export default CallRequestSessionScreen;
