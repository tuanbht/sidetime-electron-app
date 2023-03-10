import { AuthStoreType } from "./AuthStore";
import { CallRequestStoreType } from "./CallRequestStore";
import { NotificationStoreType } from "./NotificationStore";
import { DeeplinkStoreType } from "./DeeplinkStore";
import { CallRequestCommentsStoreType } from "./CallRequestCommentsStore";
import { UserStoreType } from "./UserStore";
import { SiteStoreType } from "./SiteStore";

export type StoreProperties = {
  authStore: AuthStoreType;
  callRequestStore: CallRequestStoreType;
  callRequestCommentsStore: CallRequestCommentsStoreType;
  notificationStore: NotificationStoreType;
  deeplinkStore: DeeplinkStoreType;
  userStore: UserStoreType;
  siteStore: SiteStoreType;
  isLoading: boolean;
};
export type StorePublicInterface = {
  setIsLoading: (isLoading: boolean) => void;
};
export type RootStoreType = StoreProperties & StorePublicInterface;
