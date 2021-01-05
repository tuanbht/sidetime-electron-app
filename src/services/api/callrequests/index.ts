import { request } from "../../../utils/axios";
import { CallRequest } from "../../../types/models";

const index = (): Promise<CallRequest[]> =>
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
