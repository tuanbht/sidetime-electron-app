import { UserType } from "../models";
import { LoginFormType } from "../screens/Login";

export type StoreProperties = {
  currentUser: null | undefined | UserType;
};

export type StorePublicInterface = {
  login: (loginForm: LoginFormType) => Promise<void>;
  signInWithToken: (token: string) => Promise<void>;
  checkLoggedInUser: () => boolean;
  logout: () => Promise<void>;
};

export type AuthStoreType = StoreProperties & StorePublicInterface;
