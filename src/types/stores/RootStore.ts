import { AuthStoreType } from "./AuthStore";
import { CallRequestStoreType } from "./CallRequestStore";

export type StoreProperties = {
  authStore: AuthStoreType;
  callRequestStore: CallRequestStoreType;
};
export type StorePublicInterface = {};
export type RootStoreType = StoreProperties & StorePublicInterface;
