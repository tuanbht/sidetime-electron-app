import { MembershipType } from './../models';
import { UserType } from "../models";

export type StoreProperties = {
  memberships: MembershipType[] | undefined;
};

export type StorePublicInterface = {
  getCurrentUser: () => Promise<UserType >
};

export type UserStoreType = StoreProperties &
  StorePublicInterface;
