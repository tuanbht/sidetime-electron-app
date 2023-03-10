import { CommentType } from "../models";

export type CommentListItemPropsType = {
  comment: CommentType;
  side: "left" | "right";
};
