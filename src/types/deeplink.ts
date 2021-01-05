export type ParsedDeepLink = {
  token: string | string[] | null | undefined;
  protocol: string | undefined;
  action: string | undefined;
};
