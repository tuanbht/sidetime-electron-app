import { CallRequestType } from "../../../types/models";

export type CallRequestListScreenPropsType = {
  onCallRequestSelect?: (callRequest: CallRequestType) => void;
};

export type CallRequestSessionScreenPropsType = {
  callRequest?: CallRequestType;
  onCallRequestSessionEnd?: () => void;
};
