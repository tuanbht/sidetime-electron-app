import { PastCallRequestsType } from './../../../types/models';
import { request } from "../../../utils/axios";
import { CallRequestType, TokenType, UpcomingCallRequestsType } from "../../../types/models";

const getCurrentCalls = (page: number = 1): Promise<UpcomingCallRequestsType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .get('/api/calls/current_for_all_sites', { params: { page } })
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const getPastCalls = (siteSlug: string, page: number = 1): Promise<PastCallRequestsType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .get(`/api/sites/${siteSlug}/calls/past`, { params: { page } })
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const get = (siteSlug: string, callSlug: string): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .get(`/api/sites/${siteSlug}/call_requests/${callSlug}`)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const update = (siteSlug: string, id: number, params: any): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .patch(`/api/sites/${siteSlug}/call_requests/${id}`, params)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const accept = (siteSlug: string, id: number, scheduledAt: string): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .patch(`/api/sites/${siteSlug}/call_requests/${id}/accept`, { scheduledAt })
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const decline = (siteSlug: string, id: number): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .patch(`/api/sites/${siteSlug}/call_requests/${id}/decline`)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const cancel = (siteSlug: string, id: number, params: any): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .patch(`/api/sites/${siteSlug}/call_requests/${id}/cancel`, params)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response));
  });

const finish = (siteSlug: string, id: number): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .patch(`/api/sites/${siteSlug}/call_requests/${id}/finish`)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const refund = (siteSlug: string, id: number): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .patch(`/api/sites/${siteSlug}/call_requests/${id}/refund`)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const bounce = (siteSlug: string, id: number, params: any): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .patch(`/api/sites/${siteSlug}/call_requests/${id}/bounce`, params)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const createToken = (siteSlug: string, id: number, params: any): Promise<TokenType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .post(`/api/sites/${siteSlug}/call_requests/${id}/twilio_video_tokens`, params)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const start = (siteSlug: string, id: number): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .patch(`/api/sites/${siteSlug}/call_requests/${id}/start`)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const pause = (siteSlug: string, id: number): Promise<CallRequestType> =>
  new Promise((resolve, reject) => {
    request
      .api()
      .patch(`/api/sites/${siteSlug}/call_requests/${id}/pause`)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res.response));
  });

const callRequests = {
  getCurrentCalls,
  getPastCalls,
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
