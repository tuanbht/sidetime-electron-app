import { CallRequestType, CommentType } from "../models";

export type StoreProperties = {
  comments: Map<number, CommentType[]>;
};
export type CreateCommentRequestType = {
  message: string;
};

export type StorePublicInterface = {
  fetchComments: (callRequest: CallRequestType) => Promise<CommentType[]>;
  createComment: (
    callRequest: CallRequestType,
    params: CreateCommentRequestType
  ) => Promise<CommentType>;
  destroyComment: (
    callRequest: CallRequestType,
    comment: CommentType
  ) => Promise<CommentType>;
  initCommentsForCallRequest: (callRequest: CallRequestType) => void;
};

export type CallRequestCommentsStoreType = StoreProperties &
  StorePublicInterface;
