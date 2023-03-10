import AuthStore from "./AuthStore";
import CallRequestStore from "./CallRequestStore";
import NotificationStore from "./NotificationStore";
import DeeplinkStore from "./DeeplinkStore";
import UserStore from "./UserStore";
import CallRequestCommentsStore from "./CallRequestCommentsStore";
import { create } from "mobx-persist";
import { observable, makeObservable, runInAction } from "mobx";
import { AuthStoreType } from "../types/stores/AuthStore";
import { CallRequestStoreType } from "../types/stores/CallRequestStore";
import { NotificationStoreType } from "../types/stores/NotificationStore";
import { CallRequestCommentsStoreType } from "../types/stores/CallRequestCommentsStore";
import { RootStoreType } from "../types/stores/RootStore";
import { UserStoreType } from "../types/stores/UserStore";
import { SiteStoreType } from "../types/stores/SiteStore";
import SiteStore from "./SiteStore";

const resume = create({
  storage: localStorage,
  jsonify: true,
});

class RootStore implements RootStoreType {
  public readonly authStore: AuthStoreType;
  public readonly callRequestStore: CallRequestStoreType;
  public readonly callRequestCommentsStore: CallRequestCommentsStoreType;
  public readonly notificationStore: NotificationStoreType;
  public readonly deeplinkStore: DeeplinkStore;
  public readonly userStore: UserStoreType;
  public readonly siteStore: SiteStoreType;
  public isLoading: boolean;

  constructor() {
    this.authStore = new AuthStore(this);
    this.callRequestStore = new CallRequestStore(this);
    this.callRequestCommentsStore = new CallRequestCommentsStore(this);
    this.notificationStore = new NotificationStore(this);
    this.deeplinkStore = new DeeplinkStore(this);
    this.userStore = new UserStore(this);
    this.siteStore = new SiteStore(this);

    makeObservable(this, {
      authStore: observable,
      isLoading: observable,
    });

    this.isLoading = true;
    this.resumeStores();
  }

  public setIsLoading = (isLoading: boolean): void => {
    runInAction(() => (this.isLoading = isLoading));
  };

  private resumeStores = (): void => {
    try {
      Promise.all([resume("authStore", this.authStore), resume("siteStore", this.siteStore)]).then(() => {
        this.setIsLoading(false);
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("An error occurred while resuming store states: " + err);
    }
  };
}

export default RootStore;
