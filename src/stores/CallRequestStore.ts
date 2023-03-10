import { PastCallRequestsType, UpcomingCallRequestsType } from './../types/models';
import api from "../services/api";
import { observable, runInAction, makeObservable, action } from "mobx";
import { RootStoreType } from "../types/stores/RootStore";
import { CallRequestType } from "../types/models";
import {
  BounceCallRequestType,
  CallRequestStoreType,
  CancellCallRequestType,
  UpdateCallRequestType,
  CallRequestTwilioTokenType,
} from "../types/stores/CallRequestStore";

class CallRequestStore implements CallRequestStoreType {
  public callRequest: CallRequestType | undefined = undefined;
  public upcomingCallRequests: UpcomingCallRequestsType | undefined = undefined;
  public pastCallRequests: CallRequestType[] | undefined = undefined;
  public rootStore: RootStoreType;

  constructor(rootStore: RootStoreType) {
    this.rootStore = rootStore;

    makeObservable(this, {
      callRequest: observable,
      upcomingCallRequests: observable,
      pastCallRequests: observable,
      fetchCurrentCallRequests: action,
    });
  }

  public fetchCallRequest = (id: string): Promise<CallRequestType> => {
    return new Promise((resolve, reject) => {
      api.callRequests
        .get(parseInt(id))
        .then((callRequest) => resolve(callRequest))
        .catch((err) => reject(err));
    });
  };

  public fetchCurrentCallRequests = (): Promise<UpcomingCallRequestsType> => {
    return new Promise((resolve, reject) => {
      api.callRequests
        .getCurrentCalls()
        .then((response) => {
          runInAction(() => this.upcomingCallRequests = response);
          resolve(response);
        })
        .catch((err) => {
          runInAction(() => {
            const authStore = this.rootStore?.authStore;
            return authStore ? authStore.logout() : () => {};
          });
          reject(err);
        })
    });
  };

  public fetchPastCallRequests = (): Promise<PastCallRequestsType> => {
    const siteSlug = this.rootStore.siteStore.siteSlug;

    return new Promise((resolve, reject) => {
      siteSlug ?
        api.callRequests
          .getPastCalls(siteSlug)
          .then((response) => {
            runInAction(() => this.pastCallRequests = response.data);
            resolve(response);
          })
          .catch((err) => {
            runInAction(() => {
              const authStore = this.rootStore?.authStore;
              return authStore ? authStore.logout() : () => {};
            });
            reject(err);
          }) :
        reject('');
    });
  };

  public updateCallRequest = (
    callRequest: CallRequestType,
    params: UpdateCallRequestType,
  ): Promise<CallRequestType> => {
    return new Promise((resolve, reject) => {
      api.callRequests
        .update(callRequest.id, params)
        .then((callRequest) => {
          resolve(callRequest);
        })
        .catch((err) => reject(err));
    });
  };

  public setCallRequestAsAccepted = (
    callRequest: CallRequestType,
    scheduledAt: string,
  ): Promise<CallRequestType> => {
    return new Promise((resolve, reject) => {
      api.callRequests
        .accept(callRequest.id, scheduledAt)
        .then((callRequest) => {
          resolve(callRequest);
        })
        .catch((err) => reject(err));
    });
  };

  public setCallRequestAsDeclined = (
    callRequest: CallRequestType,
  ): Promise<CallRequestType> => {
    return new Promise((resolve, reject) => {
      api.callRequests
        .decline(callRequest.id)
        .then((callRequest) => {
          resolve(callRequest);
        })
        .catch((err) => reject(err));
    });
  };

  public setCallRequestAsCanceled = (
    callRequest: CallRequestType,
    params: CancellCallRequestType,
  ): Promise<CallRequestType> => {
    return new Promise((resolve, reject) => {
      api.callRequests
        .cancel(callRequest.id, params)
        .then((callRequest) => {
          resolve(callRequest);
        })
        .catch((err) => reject(err));
    });
  };

  public setCallRequestAsFinished = (
    callRequest: CallRequestType,
  ): Promise<CallRequestType> => {
    return new Promise((resolve, reject) => {
      api.callRequests
        .finish(callRequest.id)
        .then((callRequest) => {
          resolve(callRequest);
        })
        .catch((err) => reject(err));
    });
  };

  public setCallRequestAsRefunded = (
    callRequest: CallRequestType,
  ): Promise<CallRequestType> => {
    return new Promise((resolve, reject) => {
      api.callRequests
        .refund(callRequest.id)
        .then((callRequest) => {
          resolve(callRequest);
        })
        .catch((err) => reject(err));
    });
  };

  public setCallRequestAsStarted = (
    callRequest: CallRequestType,
  ): Promise<CallRequestType> => {
    return new Promise((resolve, reject) => {
      api.callRequests
        .start(callRequest.id)
        .then((callRequest) => {
          resolve(callRequest);
        })
        .catch((err) => reject(err));
    });
  };

  public setCallRequestAsPaused = (
    callRequest: CallRequestType,
  ): Promise<CallRequestType> => {
    return new Promise((resolve, reject) => {
      api.callRequests
        .pause(callRequest.id)
        .then((callRequest) => {
          resolve(callRequest);
        })
        .catch((err) => reject(err));
    });
  };

  public bounceCallRequest = (
    callRequest: CallRequestType,
    params: BounceCallRequestType,
  ): Promise<CallRequestType> => {
    return new Promise((resolve, reject) => {
      api.callRequests
        .bounce(callRequest.id, params)
        .then((callRequest) => {
          resolve(callRequest);
        })
        .catch((err) => reject(err));
    });
  };

  public createTwilioToken = (
    callRequest?: CallRequestType,
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const call = this.callRequest || callRequest;
      const currentUser = this.rootStore?.authStore?.currentUser;

      if (!call || !currentUser) {
        reject("No call request provided");
        return;
      }

      const token: CallRequestTwilioTokenType = {
        identity: currentUser.name,
        room: call.slug,
      };

      api.callRequests
        .createToken(call.id, { token: token })
        .then((result) => resolve(result.token))
        .catch((err) => reject(err));
    });
  };
}

export default CallRequestStore;
