import React, { useState, useEffect } from "react";
import Participant from "../../../components/Participant";
import Video, {
  Room,
  Participant as ParticipantType,
  LocalDataTrack,
  LocalVideoTrack,
} from "twilio-video";

import { CallRequestSessionScreenProps } from "../../../types/screens/CallRequest";
import { StyledContainer } from "./styles";
import { createTokenForRoom } from "../../../utils/twilio";

const CallRequestSessionScreen: React.FC<CallRequestSessionScreenProps> = (
  props
) => {
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
    const {
      callRequest: { my_role, requester, expert, slug },
    } = props;
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
  }, [props]);

  return (
    <StyledContainer>
      <button onClick={props.onCallRequestSessionEnd}>Leave</button>
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
          />
        </>
      ) : null}
      {remoteParticipants}
    </StyledContainer>
  );
};

export default CallRequestSessionScreen;
