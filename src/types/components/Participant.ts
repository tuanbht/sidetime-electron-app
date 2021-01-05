import { Participant, LocalVideoTrack } from "twilio-video";

export type ParticipantProps = {
  participant: Participant;
  onScreenShare?: (stream: LocalVideoTrack) => void;
};
