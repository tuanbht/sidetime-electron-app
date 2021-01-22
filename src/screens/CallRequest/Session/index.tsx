import React, { useState, useEffect } from "react";
import Participant from "../../../components/Participant";
import Video, {
  Room,
  Participant as ParticipantType,
  LocalDataTrack,
  LocalVideoTrack,
} from "twilio-video";

import { CallRequestSessionScreenPropsType } from "../../../types/screens/CallRequest";
import { StyledContainer, ParticipantsContainer } from "./styles";
import { createTokenForRoom } from "../../../utils/twilio";
import useAppContext from "../../../hooks/useAppContext";
import { useHistory } from "react-router-dom";

const CallRequestSessionScreen: React.FC<CallRequestSessionScreenPropsType> = (
  props
) => {
  const history = useHistory();
  const { callRequestStore } = useAppContext();
  const [room, setRoom] = useState<Room | null>();
  const [participants, setParticipants] = useState<ParticipantType[]>([]);

  const onParticipantConnected = (participant: ParticipantType) => {
    setParticipants((prevParticipants) => [...prevParticipants, participant]);
  };
  const onParticipantDisconnected = (participant: ParticipantType) => {
    setParticipants((prevParticipants) =>
      prevParticipants.filter((p) => p.sid !== participant.sid)
    );
  };

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  useEffect(() => {
    if (!callRequestStore.callRequest) return;
    const {
      callRequest: { my_role, requester, expert, slug },
    } = callRequestStore;
    const token = createTokenForRoom(
      my_role === "requester" ? requester.name : expert.name,
      slug
    );

    Video.connect(token.toJwt(), { name: slug }).then((room) => {
      setRoom(room);
      room.on("participantConnected", onParticipantConnected);
      room.on("participantDisconnected", onParticipantDisconnected);
      room.participants.forEach(onParticipantConnected);
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
  }, [callRequestStore]);

  return (
    <StyledContainer>
      <button
        onClick={() => {
          callRequestStore.setCallRequest(undefined);
          history.push("/call_requests");
        }}
      >
        Leave
      </button>
      <ParticipantsContainer>
        {room ? (
          <>
            <Participant
              key={room.localParticipant.sid}
              participant={room.localParticipant}
              onScreenShare={async (track: LocalVideoTrack) => {
                track.once("stopped", () => {
                  room.localParticipant.unpublishTrack(track);
                });
                room.localParticipant.publishTrack(track);
              }}
              local
            />
          </>
        ) : null}
        {remoteParticipants}
      </ParticipantsContainer>
    </StyledContainer>
  );
};

export default CallRequestSessionScreen;
