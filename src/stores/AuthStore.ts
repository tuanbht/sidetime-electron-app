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
      checkSignedInUser: action,
    });
  }

  public login = async (params: LoginFormType): Promise<void> => {
    runInAction(() => {
      this.currentUser = { token: "123" };
    });
  };
  public logout = async (): Promise<void> => {};
  public checkSignedInUser = async (): Promise<void> => {};
}

export default AuthStore;
