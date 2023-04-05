import { request } from "../../../utils/axios";
import { UserType } from "../../../types/models";

const checkLatestVersion = (): Promise<UserType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .get("/api/v1/application_versions/check_latest_version", {
        params: {
          version: process.env.REACT_APP_VERSION,
        },
      })
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const applicationVersions = {
  checkLatestVersion,
};

export default applicationVersions;
