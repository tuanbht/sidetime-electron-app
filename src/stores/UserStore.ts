import { RootStoreType } from './../types/stores/RootStore';
import { UserStoreType } from './../types/stores/UserStore';
import api from "../services/api";
import { observable, runInAction, makeObservable, action } from "mobx";
import { MembershipType, UserType } from "../types/models";

class UserStore implements UserStoreType {
  public memberships: MembershipType[] | undefined = undefined;
  public rootStore: RootStoreType | undefined = undefined;

  constructor(rootStore: RootStoreType) {
    this.rootStore = rootStore;

    makeObservable(this, {
      memberships: observable,
      getCurrentUser: action,
    });
  }

  public getCurrentUser = (): Promise<UserType> => {
    return new Promise((resolve, reject) => {
      api.users
        .getCurrentUser()
        .then((user) => {
          runInAction(() => {
            this.memberships = user.memberships;

            if (user.memberships.length) {
              this.rootStore?.siteStore.setCurrentSite(user.memberships[0].site)
            }
            resolve(user)
          });
        })
        .catch((err) => reject(err));
    });
  };
}

export default UserStore;
