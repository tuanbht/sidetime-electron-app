import { CallRequestType } from "../models";

export type StoreProperties = {
  callRequest: CallRequestType | undefined;
  callRequests: CallRequestType[] | undefined;
};

export type UpdateCallRequestType = {
  reply?: string;
  reply_user_id: string;
  proposed_times?: string[];
};

export type BounceCallRequestType = {
  reply?: string;
  reply_user_id: string;
  proposed_times: string[];
};

export type CancellCallRequestType = {
  reply?: string;
};

export type CallRequestTwilioTokenType = {
  identity: string;
  room: string;
};

export type StorePublicInterface = {
  fetchCallRequests: () => Promise<CallRequestType[]>;
  fetchCallRequest?: (id: number) => Promise<CallRequestType>;
  updateCallRequest: (
    callRequest: CallRequestType,
    params: UpdateCallRequestType
  ) => Promise<CallRequestType>;
  setCallRequest: (callRequest: CallRequestType | undefined) => void;
  setCallRequestAsAccepted: (
    callRequest: CallRequestType,
    scheduled_at: string
  ) => Promise<void>;
  setCallRequestAsDeclined: (callRequest: CallRequestType) => Promise<void>;
  setCallRequestAsCanceled: (
    callRequest: CallRequestType,
    params: CancellCallRequestType
  ) => Promise<void>;
  setCallRequestAsFinished: (callRequest: CallRequestType) => Promise<void>;
  setCallRequestAsRefunded: (callRequest: CallRequestType) => Promise<void>;
  createTwilioToken: (callRequest?: CallRequestType) => Promise<string>;
  bounceCallRequest: (
    callRequest: CallRequestType,
    params: BounceCallRequestType
  ) => Promise<CallRequestType>;
};

export type CallRequestStoreType = StoreProperties & StorePublicInterface;
