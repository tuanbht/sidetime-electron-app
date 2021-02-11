import dayjs from "dayjs";
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
