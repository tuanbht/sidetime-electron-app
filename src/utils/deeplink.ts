import { ParsedDeepLink } from "../types/deeplink";
import qs from "query-string";

export const parseDeepLink = (deepLink: string): ParsedDeepLink => {
  try {
    const url = new URL(deepLink || "");
    const parsed = qs.parse(url.search);

    return {
      token: parsed["token"],
      action: url.pathname,
      protocol: url.protocol,
    };
  } catch (error) {
    return { token: undefined, protocol: undefined, action: undefined };
  }
};
