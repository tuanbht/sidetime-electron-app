import api from "../services/api";
import { observable, runInAction, makeObservable, action } from "mobx";
import { persist } from "mobx-persist";
import { RootStoreType } from "../types/stores/RootStore";
import { AuthStoreType } from "../types/stores/AuthStore";
import { UserType } from "../types/models";
import { LoginFormType } from "../types/screens/Login/index";

class AuthStore implements AuthStoreType {
  @persist("object") public currentUser:
    | null
    | undefined
    | UserType = undefined;

  constructor(rootStore: RootStoreType) {
    makeObservable(this, {
      currentUser: observable,
      login: action,
      logout: action,
      checkLoggedInUser: action,
    });
  }

  public login = async (params: LoginFormType): Promise<void> => {
    return new Promise((resolve, reject) => {
      api.sessions
        .create(params)
        .then((response) => {
          runInAction(() => (this.currentUser = response));
          resolve();
        })
        .catch((err) => {
          reject(err);
          this.currentUser = null;
        });
    });
  };

  public signInWithToken = async (token: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      api.sessions
        .signInWithToken(token)
        .then((response) => {
          runInAction(() => (this.currentUser = response));
          resolve();
        })
        .catch((err) => {
          reject(err);
          this.currentUser = null;
        });
    });
  };

  public logout = async (): Promise<void> => {
    runInAction(() => (this.currentUser = null));
  };

  public checkLoggedInUser = (): boolean => {
    return !!this.currentUser;
  };
}

export default AuthStore;
