import { request } from "../../../utils/axios";
import { CommentType } from "../../../types/models";

const create = (params: any): Promise<CommentType[]> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .post('/api/comments', params)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const comments = {
  create,
};

export default comments;
