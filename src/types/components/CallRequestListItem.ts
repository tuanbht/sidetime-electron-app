import { CSSProp } from "styled-components";
import { CallRequestType } from "../models";

export type CallRequestListItemStyleType = {
  css?: CSSProp;
};

export type CallRequestListItemPropsType = CallRequestListItemStyleType & {
  callRequest: CallRequestType;
};

export type CallListItemActionsModalPropsType = {
  callRequest: CallRequestType;
};

export type CancelCallModalPropsType = CallListItemActionsModalPropsType;
export type DeclineCallModalPropsType = CallListItemActionsModalPropsType;
export type MarkAsCompleteModalPropsType = CallListItemActionsModalPropsType;
export type ProposedTimesModalPropsType = CallListItemActionsModalPropsType;
export type RescheduleCallModalPropsType = CallListItemActionsModalPropsType;
