import {
  observable,
  runInAction,
  makeObservable,
  action,
  reaction,
} from "mobx";
import { RootStoreType } from "../types/stores/RootStore";
import {
  NotificationStoreType,
  NotificationType,
} from "../types/stores/NotificationStore";

class NotificationStore implements NotificationStoreType {
  public notification: NotificationType | undefined = undefined;

  constructor(rootStore: RootStoreType) {
    makeObservable(this, {
      notification: observable,
      setNotification: action,
      setSuccessNotification: action,
      setErrorNotification: action,
      clearNotifications: action,
    });

    reaction(
      () => this.notification,
      () => {
        setTimeout(() => {
          this.clearNotifications();
        }, 5000);
      }
    );
  }

  public setNotification = (notification: NotificationType) => {
    runInAction(() => {
      this.notification = notification;
    });
  };

  public setSuccessNotification = (message: string) => {
    this.setNotification({ type: "success", message });
  };

  public setErrorNotification = (message: string) => {
    this.setNotification({ type: "error", message });
  };

  public clearNotifications = () => {
    runInAction(() => {
      this.notification = undefined;
    });
  };
}

export default NotificationStore;
