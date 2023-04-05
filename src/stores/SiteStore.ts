import { SiteType } from './../types/models';
import { RootStoreType } from '../types/stores/RootStore';
import { observable, makeObservable, action, computed } from "mobx";
import { SiteStoreType } from '../types/stores/SiteStore';
import { persist } from "mobx-persist";

class SiteStore implements SiteStoreType {
  @persist("object") public currentSite:
    SiteType | undefined = undefined;

  constructor(rootStore: RootStoreType) {
    makeObservable(this, {
      currentSite: observable,
      siteSlug: computed,
      setCurrentSite: action,
    });
  }

  public setCurrentSite = (site: SiteType): void => {
    this.currentSite = site
  };

  public get siteSlug () {
    return this.currentSite?.slug
  }
}

export default SiteStore;
