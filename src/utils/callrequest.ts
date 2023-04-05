import { EXPERT_COMPLETED, EXPERT_CONNECTED } from './../constants/states';
import dayjs from "dayjs";
import { Users, Video, Phone } from "react-feather";
import {
  CALL_REQUEST_LIVE,
  CALL_REQUEST_MISSED,
  CALL_REQUEST_PAUSED,
  CALL_REQUEST_PENDING_EXPERT,
  CALL_REQUEST_PENDING_REQUESTER,
} from "../constants/states";
import { CallRequestType, UserType } from "../types/models";

export const isChargeableCancellationFee = (
  callRequest: CallRequestType,
  currentUser: null | undefined | UserType
) => {
  return isRequesterPerspective(callRequest, currentUser) &&
    callRequest.scheduledAt &&
    !isExpertMissedCall(callRequest) &&
    dayjs(callRequest.scheduledAt).isBefore(dayjs().add(1, 'day'));
};

export const getCallPerspective = (
  callRequest: CallRequestType,
  currentUser: UserType
) => callRequest.requesterId === currentUser.id ? 'requester' : 'expert';

export const getFormmatedCallRequestStatus = (callRequest: CallRequestType) => {
  const { status } = callRequest;
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const getCallPartnerNameBasedOnPerspective = (
  callRequest: CallRequestType,
  currentUser: null | undefined | UserType
) => {
  if (!currentUser) return "";

  if (isRequesterPerspective(callRequest, currentUser)) {
    return `${callRequest.otherUser.name} (expert)`;
  }

  return callRequest.otherUser.name;
};

export const isRequesterPerspective = (
  callRequest: CallRequestType,
  currentUser: null | undefined | UserType
) => {
  if (!currentUser) return false;
  return getCallPerspective(callRequest, currentUser) === "requester";
};

export const isExpertPerspective = (
  callRequest: CallRequestType,
  currentUser: null | undefined | UserType
) => {
  if (!currentUser) return false;
  return getCallPerspective(callRequest, currentUser) === "expert";
};

export const isCallRequestPending = (callRequest: CallRequestType) => {
  return [CALL_REQUEST_PENDING_EXPERT, CALL_REQUEST_PENDING_REQUESTER].includes(
    callRequest.status
  );
};

export const isCallRequestLive = (callRequest: CallRequestType) => {
  return [CALL_REQUEST_LIVE, CALL_REQUEST_PAUSED].includes(callRequest.status);
};

export const isCallRequestScheduled = (callRequest: CallRequestType) => {
  return [CALL_REQUEST_LIVE, CALL_REQUEST_PAUSED].includes(callRequest.status);
};

export const isSingleProposedCallRequest = (callRequest: CallRequestType) => {
  return (
    [CALL_REQUEST_PENDING_EXPERT, CALL_REQUEST_PENDING_REQUESTER].includes(
      callRequest.status
    ) && callRequest.proposedTimes.length <= 1
  );
};

export const isMultiProposedCallRequest = (callRequest: CallRequestType) => {
  return (
    [CALL_REQUEST_PENDING_EXPERT, CALL_REQUEST_PENDING_REQUESTER].includes(
      callRequest.status
    ) && callRequest.proposedTimes.length > 1
  );
};

export const getCallCommunicationMethod = (callRequest: CallRequestType) => {
  const { communicateVia } = callRequest;

  switch(communicateVia) {
    case 'in_person_meeting':
      return {
        icon: Users,
        callMethodName: 'In-Person Meeting',
      }
    case 'videoconference':
      return {
        icon: Video,
        callMethodName: 'Video Call',
      }
    default:
      return {
        icon: Phone,
        callMethodName: 'Phone Call'
      }
  }
}

export const isValidProposedTime = (proposedTime: string) => dayjs(proposedTime).isAfter(dayjs().add(1, 'hour'));

export const isCallFromBundle = (callRequest: CallRequestType) => Number.isInteger(callRequest.bundleRequestId);

export const isExpertMissedCall = (callRequest: CallRequestType) => {
  const { expertStatus, status } = callRequest;

  return status === CALL_REQUEST_MISSED && expertStatus && ![EXPERT_CONNECTED, EXPERT_COMPLETED].includes(expertStatus);
}
