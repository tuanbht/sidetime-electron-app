import { SiteType } from './../types/models';
import { RootStoreType } from '../types/stores/RootStore';
import { observable, makeObservable, action } from "mobx";
import { SiteStoreType } from '../types/stores/SiteStore';

class SiteStore implements SiteStoreType {
  public currentSite: SiteType | undefined = undefined;
  public rootStore: RootStoreType | undefined = undefined;

  constructor(rootStore: RootStoreType) {
    this.rootStore = rootStore;

    makeObservable(this, {
      currentSite: observable,
      setCurrentSite: action,
    });
  }

  public setCurrentSite = (site: SiteType): void => {
    this.currentSite = site
  };
}

export default SiteStore;
