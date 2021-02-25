import dayjs from "dayjs";
import {
  CALL_REQUEST_LIVE,
  CALL_REQUEST_PAUSED,
  CALL_REQUEST_PENDING_EXPERT,
  CALL_REQUEST_PENDING_REQUESTER,
} from "../constants/states";
import { CallRequestType, UserType } from "../types/models";

export const isCallRequestStartingIn24HoursOrLess = (
  callRequest: CallRequestType
) => {
  // @ts-ignore
  return dayjs(callRequest.scheduled_at) - dayjs() <= 24; // in hours
};

export const getCallPerspective = (
  callRequest: CallRequestType,
  currentUser: UserType
) => {
  const [requesterId, expertId, userId] = [
    callRequest.requester.id,
    callRequest.expert.id,
    currentUser.id,
  ].map((e) => e.toString());

  if (callRequest.my_role === "requester" && requesterId === userId)
    return "requester";
  if (callRequest.my_role === "expert" && expertId === userId) return "expert";
  return "";
};

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
    return `${callRequest.expert.name} (expert)`;
  }

  return callRequest.requester.name;
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
    ) && callRequest.proposed_times.length <= 1
  );
};

export const isMultiProposedCallRequest = (callRequest: CallRequestType) => {
  return (
    [CALL_REQUEST_PENDING_EXPERT, CALL_REQUEST_PENDING_REQUESTER].includes(
      callRequest.status
    ) && callRequest.proposed_times.length > 1
  );
};

export const getCallRequestTimestamp = (callRequest: CallRequestType) => {
  const { scheduled_at, proposed_times } = callRequest;
  if (scheduled_at) return scheduled_at;
  return proposed_times[0];
};

export const getCallRequestTime = (callRequest: CallRequestType) => {
  if (
    isCallRequestPending(callRequest) &&
    isMultiProposedCallRequest(callRequest)
  )
    return "TBC";

  const timestamp = getCallRequestTimestamp(callRequest);
  return dayjs(timestamp).format("hh:mmA");
};

export const getCallTimezone = (
  callRequest: CallRequestType,
  currentUser: UserType
) => {
  const { scheduled_at, proposed_times } = callRequest;
  if (!scheduled_at && proposed_times.length > 1)
    return "MULTIPLE TIMES PROPOSED";
  return currentUser?.timezone || "";
};
