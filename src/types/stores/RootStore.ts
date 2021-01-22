import { AuthStoreType } from "./AuthStore";

export type StoreProperties = {
  authStore: AuthStoreType;
};
export type StorePublicInterface = {};
export type RootStoreType = StoreProperties & StorePublicInterface;
