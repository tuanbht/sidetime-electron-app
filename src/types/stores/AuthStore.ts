import { UserType } from "../models";
import { LoginFormType } from "../screens/Login";

export type StoreProperties = {
  currentUser: null | undefined | UserType;
};

export type StorePublicInterface = {
  login: (loginForm: LoginFormType) => Promise<void>;
  logout: () => Promise<void>;
  checkLoggedInUser: () => boolean;
};

export type AuthStoreType = StoreProperties & StorePublicInterface;
