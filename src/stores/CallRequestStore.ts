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
import { getCallPerspective } from "../utils/callrequest";

class CallRequestStore implements CallRequestStoreType {
  public callRequest: CallRequestType | undefined = undefined;
  public callRequests: CallRequestType[] | undefined = undefined;
  public rootStore: RootStoreType | undefined = undefined;

  constructor(rootStore: RootStoreType) {
    this.rootStore = rootStore;
    makeObservable(this, {
      callRequest: observable,
      callRequests: observable,
      fetchCallRequests: action,
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

  public fetchCallRequests = (): Promise<CallRequestType[]> => {
    return new Promise((resolve, reject) => {
      api.callRequests
        .index()
        .then((callRequests) => {
          runInAction(() => (this.callRequests = callRequests));
          resolve(callRequests);
        })
        .catch((err) => {
          runInAction(() => {
            const authStore = this.rootStore?.authStore;
            return authStore ? authStore.logout() : () => {};
          });
          reject(err);
        });
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
          this.findAndUpdateCallRequests(callRequest);
          resolve(callRequest);
        })
        .catch((err) => reject(err));
    });
  };

  public setCallRequestAsAccepted = (
    callRequest: CallRequestType,
    scheduled_at: string,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      api.callRequests
        .accept(callRequest.id, scheduled_at)
        .then((callRequest) => {
          this.findAndUpdateCallRequests(callRequest);
          resolve();
        })
        .catch((err) => reject(err));
    });
  };

  public setCallRequestAsDeclined = (
    callRequest: CallRequestType,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      api.callRequests
        .decline(callRequest.id)
        .then((callRequest) => {
          this.findAndUpdateCallRequests(callRequest);
          resolve();
        })
        .catch((err) => reject(err));
    });
  };

  public setCallRequestAsCanceled = (
    callRequest: CallRequestType,
    params: CancellCallRequestType,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      api.callRequests
        .cancel(callRequest.id, params)
        .then((callRequest) => {
          this.findAndUpdateCallRequests(callRequest);
          resolve();
        })
        .catch((err) => reject(err));
    });
  };

  public setCallRequestAsFinished = (
    callRequest: CallRequestType,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      api.callRequests
        .finish(callRequest.id)
        .then((callRequest) => {
          this.findAndUpdateCallRequests(callRequest);
          resolve();
        })
        .catch((err) => reject(err));
    });
  };

  public setCallRequestAsRefunded = (
    callRequest: CallRequestType,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      api.callRequests
        .refund(callRequest.id)
        .then((callRequest) => {
          this.findAndUpdateCallRequests(callRequest);
          resolve();
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
          this.findAndUpdateCallRequests(callRequest);
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

      const perspective = getCallPerspective(call, currentUser);
      const { name } = perspective === "expert" ? call.expert : call.requester;
      const token: CallRequestTwilioTokenType = {
        identity: name,
        room: call.slug,
      };

      api.callRequests
        .createToken(call.id, { token: token })
        .then((result) => resolve(result.token))
        .catch((err) => reject(err));
    });
  };

  private findAndUpdateCallRequests = (callRequest: CallRequestType) => {
    const index = this.callRequests?.findIndex((e) => e.id === callRequest.id);

    if (index === -1) return;
    runInAction(() => {
      if (!this.callRequests) return;
      const mutatedArray = [...this.callRequests];

      // @ts-ignore
      mutatedArray[index] = callRequest;
      this.callRequests = mutatedArray;
    });
  };
}

export default CallRequestStore;
