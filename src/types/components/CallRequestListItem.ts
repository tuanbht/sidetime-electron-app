import { CSSProp } from "styled-components";
import { CallRequestType } from "../models";

export type CallRequestListItemStyleType = {
  css?: CSSProp;
};

export type CallRequestListItemPropsType = CallRequestListItemStyleType & {
  callRequest: CallRequestType;
};
