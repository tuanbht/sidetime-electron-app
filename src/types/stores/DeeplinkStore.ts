import { ParsedDeepLinkType } from "../deeplink";

export type StoreProperties = {
  deeplink: ParsedDeepLinkType | undefined;
};

export type StorePublicInterface = {
  setDeeplink: (deeplink: ParsedDeepLinkType) => Promise<ParsedDeepLinkType>;
  clearDeeplink: () => void;
};

export type DeeplinkStoreType = StoreProperties & StorePublicInterface;
