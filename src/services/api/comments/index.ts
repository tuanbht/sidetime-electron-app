import { request } from "../../../utils/axios";
import { CommentType } from "../../../types/models";

const index = (id: number): Promise<CommentType[]> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .get(`/api/v1/call_requests/${id}/comments`)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const create = (id: number, params: any): Promise<CommentType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .post(`/api/v1/call_requests/${id}/comments`, params)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const destroy = (id: number, commentId: number): Promise<CommentType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .delete(`/api/v1/call_requests/${id}/comments/${commentId}`)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const comments = {
  index,
  create,
  destroy,
};

export default comments;
