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
      createComment: action,
      initCommentsForCallRequest: action,
    });
  }

  public createComment = (
    callRequest: CallRequestType,
    commentParams: CreateCommentRequestType
  ): Promise<CommentType[]> => {
    return new Promise((resolve, reject) => {
      const { id } = callRequest;
      const params = {
        comment: {
          ...commentParams,
          callRequestId: id,
          requiresMessage: true
        }
      };
      api.comments
        .create(params)
        .then((comments) => {
          runInAction(() => {
            this.comments.set(id, comments);
          });
          resolve(comments);
        })
        .catch((err) => reject(err));
    });
  };

  public initCommentsForCallRequest = (callRequest: CallRequestType) => {
    if (this.comments.get(callRequest.id)) return;

    runInAction(() => {
      const firstComment = formatCallRequestMessageAsComment({
        userId: callRequest.requesterId,
        message: callRequest.message,
        createdAt: callRequest.createdAt,
      });
      this.comments.set(callRequest.id, [
        firstComment,
        ...callRequest.comments,
      ]);
    });
  };
}

export default CallRequestCommentsStore;
