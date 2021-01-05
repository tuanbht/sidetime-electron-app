import { CallRequest } from "../../../types/models";

export type CallRequestListScreenProps = {
  onCallRequestSelect: (callRequest: CallRequest) => void;
};

export type CallRequestSessionScreenProps = {
  callRequest: CallRequest;
  onCallRequestSessionEnd: () => void;
};
