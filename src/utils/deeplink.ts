import { ParsedDeepLinkType } from "../types/deeplink";
import qs from "query-string";

export const sanitizeToken = (token: string | string[] | null) => {
  if (!token) return undefined;
  if (Array.isArray(token)) return token.pop();
  return token;
};

export const parseDeepLink = (deepLink: string): ParsedDeepLinkType => {
  try {
    const url = new URL(deepLink || "");
    const parsed = qs.parse(url.search);

    return {
      siteSlug: sanitizeToken(parsed["site_slug"]),
      callRequestSlug: sanitizeToken(parsed["call_request_slug"]),
      token: sanitizeToken(parsed["token"]),
      action: url.pathname,
      protocol: url.protocol,
    };
  } catch (error) {
    return {
      siteSlug: undefined,
      token: undefined,
      protocol: undefined,
      action: undefined,
      callRequestSlug: undefined,
    };
  }
};
