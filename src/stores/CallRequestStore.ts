import api from "../services/api";
import { observable, runInAction, makeObservable, action } from "mobx";
import { RootStoreType } from "../types/stores/RootStore";
import { CallRequestType } from "../types/models";
import { CallRequestStoreType } from "../types/stores/CallRequestStore";

class CallRequestStore implements CallRequestStoreType {
  public callRequest: CallRequestType | undefined = undefined;
  public callRequests: CallRequestType[] | undefined = undefined;

  constructor(rootStore: RootStoreType) {
    makeObservable(this, {
      callRequest: observable,
      callRequests: observable,
      setCallRequest: action,
      fetchCallRequests: action,
    });
  }

  public setCallRequest = (selectedCall: CallRequestType | undefined) => {
    runInAction(() => (this.callRequest = selectedCall));
  };

  public fetchCallRequests = (): Promise<CallRequestType[]> => {
    return new Promise((resolve, reject) => {
      api.callRequests
        .index()
        .then((response) => {
          runInAction(() => (this.callRequests = response));
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}

export default CallRequestStore;
