import { SiteType } from "../models";

export type StoreProperties = {
  currentSite: SiteType | undefined
};

export type StorePublicInterface = {
  setCurrentSite: (site: SiteType) => void;
};

export type SiteStoreType = StoreProperties & StorePublicInterface;
