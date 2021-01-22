import { request } from "../../../utils/axios";
import { UserType } from "../../../types/models";
import { LoginFormType } from "../../../types/screens/Login";

const create = (params: LoginFormType): Promise<UserType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .post("/api/v1/sessions", params)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const sessions = {
  create,
};

export default sessions;
