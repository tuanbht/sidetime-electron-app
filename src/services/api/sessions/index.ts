import { request } from "../../../utils/axios";
import { UserType } from "../../../types/models";
import { LoginFormType } from "../../../types/screens/Login";

const create = (params: LoginFormType): Promise<UserType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .post("/api/users/sign_in", { session: params })
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const signInWithToken = (token: string): Promise<UserType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .post("/api/users/sign_in_with_token", { session: { token }})
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const sessions = {
  create,
  signInWithToken
};

export default sessions;
