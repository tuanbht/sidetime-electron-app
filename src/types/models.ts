type ListCallsPaginationType = {
  total: number;
  totalPage: number;
  page: number;
  pageSize: number;
}

export type MembershipType = {
  id: number;
  name: string;
  site: SiteType;
}

export type UserType = {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  location: string;
  timezone: string;
  headline: string;
  organization: string;
  bio: string;
  token?: string;
  memberships: MembershipType[]
};

export type SiteType = {
  id: number;
  name: string;
  rootDomain?: string;
  slug?: string;
};

export type OtherUserType = {
  id: number;
  name: string;
  avatar: string;
};

export type MessageType = {
  userId: number;
  message: string;
  createdAt: string;
};

export type CommentType = MessageType & {
  id: number;
};

export type CallRequestType = {
  id: number;
  requesterId: number;
  bundleRequestId: number | null;
  otherUser: OtherUserType;
  callTypeName: string;
  comments: CommentType[];
  createdAt: string;
  durationInMins: number;
  messagingEnabled: boolean;
  message: string;
  minutesUsed: number;
  totalCost: number;
  proposedTimes: string[];
  scheduledAt: string;
  site: SiteType;
  slug: string;
  status:
    | "live"
    | "pending_expert_acceptance"
    | "pending_requester"
    | "scheduled"
    | "completed"
    | "declined"
    | "canceled"
    | "paused"
    | "extended"
    | "incomplete"
    | "pending_connection"
    | "missed";
  updated_at: string;
  communicateVia: "audio" | "videoconference" | "in_person_meeting";
  refundable: boolean;
  expertStatus:
    | 'expert_called' | 'expert_uncalled' | 'expert_busy'
    | 'expert_failed' | 'expert_no_answer' | 'expert_canceled'
    | 'expert_connected' | 'expert_completed' | null;
  callVia: 'system' | 'zoom';
};

export type TokenType = {
  token: string;
};

export type UpcomingCallRequestsType = {
  pagination: ListCallsPaginationType,
  data: {
    requiresResponse?: CallRequestType[],
    pending?: CallRequestType[],
    completed?: CallRequestType[],
    scheduled?: CallRequestType[],
  }
}

export type PastCallRequestsType = {
  pagination: ListCallsPaginationType,
  data: CallRequestType[]
}
