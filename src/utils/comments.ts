import { CommentType, MessageType } from "../types/models";

export const formatCallRequestMessageAsComment = (
  message: MessageType
): CommentType => {
  return { id: -1, ...message };
};
