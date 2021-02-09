import { AuthStoreType } from "./AuthStore";
import { CallRequestStoreType } from "./CallRequestStore";
import { NotificationStoreType } from "./NotificationStore";
import { DeeplinkStoreType } from "./DeeplinkStore";

export type StoreProperties = {
  authStore: AuthStoreType;
  callRequestStore: CallRequestStoreType;
  notificationStore: NotificationStoreType;
  deeplinkStore: DeeplinkStoreType;
  isLoading: boolean;
};
export type StorePublicInterface = {
  setIsLoading: (isLoading: boolean) => void;
};
export type RootStoreType = StoreProperties & StorePublicInterface;
