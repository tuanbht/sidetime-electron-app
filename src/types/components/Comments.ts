import { CallRequestType } from "../models";

export type CommentsListPropsType = {
  callRequest: CallRequestType;
  children?: React.ReactNode;
};

export type CommentCreatePropsType = {
  callRequest: CallRequestType;
};

export type CommentFormType = {
  message: string;
};
