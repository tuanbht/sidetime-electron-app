import { UpcomingCallRequestsType, PastCallRequestsType } from './../models';
import { CallRequestType } from "../models";

export type StoreProperties = {
  callRequest: CallRequestType | undefined;
  pastCallRequests: PastCallRequestsType | undefined;
  upcomingCallRequests: UpcomingCallRequestsType | undefined;
};

export type UpdateCallRequestType = {
  reply?: string;
  replyUserId?: number;
  proposedTimes?: string[];
};

export type BounceCallRequestType = {
  reply?: string;
  replyUserId?: number;
  proposedTimes: string[];
};

export type CancellCallRequestType = {
  reply?: string;
};

export type CallRequestTwilioTokenType = {
  identity: string;
  room: string;
};

export type StorePublicInterface = {
  fetchCurrentCallRequests: (page?: number) => Promise<UpcomingCallRequestsType>;
  fetchPastCallRequests: (page?: number) => Promise<PastCallRequestsType>;
  fetchCallRequest: (siteSlug: string, id: string) => Promise<CallRequestType>;
  updateCallRequest: (
    callRequest: CallRequestType,
    params: UpdateCallRequestType
  ) => Promise<CallRequestType>;
  setCallRequestAsAccepted: (
    callRequest: CallRequestType,
    scheduledAt: string
  ) => Promise<CallRequestType>;
  setCallRequestAsDeclined: (callRequest: CallRequestType) => Promise<CallRequestType>;
  setCallRequestAsCanceled: (
    callRequest: CallRequestType,
    params: CancellCallRequestType
  ) => Promise<CallRequestType>;
  setCallRequestAsFinished: (callRequest: CallRequestType) => Promise<CallRequestType>;
  setCallRequestAsRefunded: (callRequest: CallRequestType) => Promise<CallRequestType>;
  setCallRequestAsStarted: (
    callRequest: CallRequestType
  ) => Promise<CallRequestType>;
  setCallRequestAsPaused: (
    callRequest: CallRequestType
  ) => Promise<CallRequestType>;
  createTwilioToken: (callRequest?: CallRequestType) => Promise<string>;
  bounceCallRequest: (
    callRequest: CallRequestType,
    params: BounceCallRequestType
  ) => Promise<CallRequestType>;
};

export type CallRequestStoreType = StoreProperties & StorePublicInterface;
