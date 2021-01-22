import { CallRequestType } from "../models";

export type StoreProperties = {
  callRequest: CallRequestType | undefined;
  callRequests: CallRequestType[] | undefined;
};

export type StorePublicInterface = {
  fetchCallRequests: () => Promise<CallRequestType[]>;
  fetchCallRequest?: (id: number) => Promise<CallRequestType>;
  setCallRequest: (callRequest: CallRequestType | undefined) => void;
};

export type CallRequestStoreType = StoreProperties & StorePublicInterface;
