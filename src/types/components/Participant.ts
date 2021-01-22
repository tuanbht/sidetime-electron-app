import { Participant, LocalVideoTrack } from "twilio-video";

export type ParticipantPropsType = {
  participant: Participant;
  local?: boolean;
  onScreenShare?: (stream: LocalVideoTrack) => void;
};
