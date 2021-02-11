import {
  LocalParticipant as LocalParticipantType,
  RemoteParticipant as RemoteParticipantType,
} from "twilio-video";
import { CountdownInterface } from "../../../components/Countdown";
import { CallRequestType } from "../../models";

export type CallRequestListScreenPropsType = {};
export type CallRequestSessionScreenPropsType = {};
export type CallRequestSessionScreenRouteParams = {
  id: string | undefined;
};
export type RemoteParticipantPropsType = {
  participant: RemoteParticipantType | undefined;
  callRequest: CallRequestType | undefined;
};

export type LocalParticipantPropsType = {
  participant: LocalParticipantType | undefined;
  callRequest: CallRequestType | undefined;
  countdownRef?: React.Ref<CountdownInterface>;
  onCallEnded?: () => void;
  onEndCallButtonClick?: () => void;
};
