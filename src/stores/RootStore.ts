import AuthStore from "./AuthStore";
import CallRequestStore from "./CallRequestStore";
import { create } from "mobx-persist";
import { observable, makeObservable } from "mobx";
import { AuthStoreType } from "../types/stores/AuthStore";
import { CallRequestStoreType } from "../types/stores/CallRequestStore";
import { RootStoreType } from "../types/stores/RootStore";

const resume = create({
  storage: localStorage,
  jsonify: true,
});

class RootStore implements RootStoreType {
  public readonly authStore: AuthStoreType;
  public readonly callRequestStore: CallRequestStoreType;

  constructor() {
    this.authStore = new AuthStore(this);
    this.callRequestStore = new CallRequestStore(this);
    makeObservable(this, {
      authStore: observable,
    });

    this.resumeStores();
  }

  private resumeStores = (): void => {
    try {
      Promise.all([resume("authStore", this.authStore)]).then(() => {
        // eslint-disable-next-line no-console
        console.log("Stores states resumed...");
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("An error occurred while resuming store states: " + err);
    }
  };
}

export default RootStore;
