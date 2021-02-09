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
      call_request_id: sanitizeToken(parsed["call_request_id"]),
      token: sanitizeToken(parsed["token"]),
      action: url.pathname,
      protocol: url.protocol,
    };
  } catch (error) {
    return {
      token: undefined,
      protocol: undefined,
      action: undefined,
      call_request_id: undefined,
    };
  }
};
