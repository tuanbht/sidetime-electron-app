import {
  LocalParticipant as LocalParticipantType,
  RemoteParticipant as RemoteParticipantType,
} from "twilio-video";
import { CallRequestType } from "../../models";

export type CallRequestListScreenPropsType = {};
export type CallRequestSessionScreenPropsType = {};
export type RemoteParticipantPropsType = {
  participant: RemoteParticipantType | undefined;
  callRequest: CallRequestType | undefined;
};

export type LocalParticipantPropsType = {
  participant: LocalParticipantType | undefined;
  callRequest: CallRequestType | undefined;
};
