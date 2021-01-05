import { jwt } from "twilio";

export const createTokenForRoom = (identity: any, room: string) => {
  const ACCOUNT_SID = "AC408f357d831f21b22b513558ad161388";
  const API_KEY_SID = "SK2005a6bc09e80c4eef86547724f1573b";
  const API_KEY_SECRET = "VaobzobZ4ePZusteglt501Mpm5zXJsFp";
  const token = new jwt.AccessToken(ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET, {
    identity,
    ttl: 3600,
  });
  const videoGrant = new jwt.AccessToken.VideoGrant({ room });

  token.addGrant(videoGrant);
  return token;
};
