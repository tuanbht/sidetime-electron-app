import { Participant, LocalVideoTrack } from "twilio-video";

export type ParticipantPropsType = {
  participant: Participant;
  onScreenShare?: (stream: LocalVideoTrack) => void;
};
