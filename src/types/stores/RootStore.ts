import { AuthStoreType } from "./AuthStore";
import { CallRequestStoreType } from "./CallRequestStore";
import { NotificationStoreType } from "./NotificationStore";

export type StoreProperties = {
  authStore: AuthStoreType;
  callRequestStore: CallRequestStoreType;
  notificationStore: NotificationStoreType;
  isLoading: boolean;
};
export type StorePublicInterface = {};
export type RootStoreType = StoreProperties & StorePublicInterface;
