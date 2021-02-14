import { CallRequestType, CommentType } from "../models";

export type CommentListItemPropsType = {
  comment: CommentType;
  callRequest: CallRequestType;
  side: "left" | "right";
};
