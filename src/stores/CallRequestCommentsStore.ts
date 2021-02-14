import api from "../services/api";
import { makeObservable, action, observable, runInAction } from "mobx";
import { RootStoreType } from "../types/stores/RootStore";
import { CallRequestType, CommentType } from "../types/models";
import {
  CallRequestCommentsStoreType,
  CreateCommentRequestType,
} from "../types/stores/CallRequestCommentsStore";
import { formatCallRequestMessageAsComment } from "../utils/comments";

class CallRequestCommentsStore implements CallRequestCommentsStoreType {
  public comments: Map<number, CommentType[]>;

  constructor(_: RootStoreType) {
    this.comments = new Map();
    makeObservable(this, {
      comments: observable,
      fetchComments: action,
      createComment: action,
      destroyComment: action,
      initCommentsForCallRequest: action,
    });
  }

  public fetchComments = (
    callRequest: CallRequestType
  ): Promise<CommentType[]> => {
    return new Promise((resolve, reject) => {
      api.comments
        .index(callRequest.id)
        .then((comments) => {
          runInAction(() => {
            const firstComment = formatCallRequestMessageAsComment(
              callRequest.message
            );
            this.comments.set(callRequest.id, [firstComment, ...comments]);
          });
          resolve(comments);
        })
        .catch((err) => reject(err));
    });
  };

  public createComment = (
    callRequest: CallRequestType,
    params: CreateCommentRequestType
  ): Promise<CommentType> => {
    return new Promise((resolve, reject) => {
      const { id } = callRequest;
      api.comments
        .create(callRequest.id, params)
        .then((comment) => {
          runInAction(() => {
            const comments = this.comments.get(id);
            if (!comments) this.comments.set(id, [comment]);
            else this.comments.set(id, [...comments, comment]);
          });
          resolve(comment);
        })
        .catch((err) => reject(err));
    });
  };

  public destroyComment = (
    callRequest: CallRequestType,
    comment: CommentType
  ): Promise<CommentType> => {
    return new Promise((resolve, reject) => {
      api.comments
        .destroy(callRequest.id, comment.id)
        .then((comment) => resolve(comment))
        .catch((err) => reject(err));
    });
  };

  public initCommentsForCallRequest = (callRequest: CallRequestType) => {
    if (this.comments.get(callRequest.id)) return;

    runInAction(() => {
      const firstComment = formatCallRequestMessageAsComment(
        callRequest.message
      );
      this.comments.set(callRequest.id, [
        firstComment,
        ...callRequest.comments,
      ]);
    });
  };
}

export default CallRequestCommentsStore;
