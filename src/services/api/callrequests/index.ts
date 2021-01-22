import { request } from "../../../utils/axios";
import { CallRequestType } from "../../../types/models";

const index = (): Promise<CallRequestType[]> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .get("/api/v1/call_requests")
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const callRequests = {
  index,
};

export default callRequests;
