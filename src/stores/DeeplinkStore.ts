import { observable, runInAction, makeObservable, action } from "mobx";
import { RootStoreType } from "../types/stores/RootStore";
import { DeeplinkStoreType } from "../types/stores/DeeplinkStore";
import { ParsedDeepLinkType } from "../types/deeplink";

class DeeplinkStore implements DeeplinkStoreType {
  public deeplink: ParsedDeepLinkType | undefined = undefined;

  constructor(rootStore: RootStoreType) {
    makeObservable(this, {
      deeplink: observable,
      setDeeplink: action,
      clearDeeplink: action,
    });
  }

  public clearDeeplink = (): void => {
    runInAction(() => {
      this.deeplink = undefined;
    });
  };

  public setDeeplink = (
    deeplink: ParsedDeepLinkType
  ): Promise<ParsedDeepLinkType> => {
    return new Promise((resolve) => {
      runInAction(() => {
        this.deeplink = deeplink;
        resolve(deeplink);
      });
    });
  };
}

export default DeeplinkStore;
