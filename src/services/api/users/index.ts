import { request } from "../../../utils/axios";
import { UserType } from "../../../types/models";

const getCurrentUser = (): Promise<UserType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .get("/api/users/current")
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const users = {
  getCurrentUser,
};

export default users;
