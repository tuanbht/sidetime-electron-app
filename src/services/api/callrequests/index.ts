import { request } from "../../../utils/axios";
import { CallRequestType, TokenType } from "../../../types/models";

const index = (): Promise<CallRequestType[]> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .get("/api/v1/call_requests")
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const get = (id: number): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .get(`/api/v1/call_requests/${id}`)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const update = (id: number, params: any): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .patch(`/api/v1/call_requests/${id}`, params)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const accept = (id: number, scheduled_at: string): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .patch(`/api/v1/call_requests/${id}/accept`, { scheduled_at })
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const decline = (id: number): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .patch(`/api/v1/call_requests/${id}/decline`)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const cancel = (id: number, params: any): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .patch(`/api/v1/call_requests/${id}/cancel`, params)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const finish = (id: number): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .patch(`/api/v1/call_requests/${id}/finish`)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const refund = (id: number): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .patch(`/api/v1/call_requests/${id}/refund`)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const bounce = (id: number, params: any): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .patch(`/api/v1/call_requests/${id}/bounce`, params)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const createToken = (id: number, params: any): Promise<TokenType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .post(`/api/v1/call_requests/${id}/twilio_video_tokens`, params)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const start = (id: number): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .patch(`/api/v1/call_requests/${id}/start`)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const pause = (id: number): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .patch(`/api/v1/call_requests/${id}/pause`)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const callRequests = {
  index,
  get,
  update,
  accept,
  decline,
  cancel,
  finish,
  refund,
  bounce,
  createToken,
  start,
  pause,
};

export default callRequests;
