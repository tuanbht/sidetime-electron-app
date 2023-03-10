import dayjs from "dayjs";
import { CallRequestType, UserType } from "../types/models";
import { getCallPartnerNameBasedOnPerspective } from "./callrequest";

export const getScheduledCallRequestMessage = (
  callRequest: CallRequestType,
  currentUser: UserType | null | undefined,
  proposedTime?: string
) => {
  if (!currentUser) return "";
  const partner = getCallPartnerNameBasedOnPerspective(
    callRequest,
    currentUser
  );
  const time = dayjs(
    proposedTime ? proposedTime : callRequest.proposedTimes[0]
  ).tz(currentUser.timezone).format("dddd MMM DD YYYY hh:mm A");

  return `Call with ${partner} scheduled for ${time} `;
};
