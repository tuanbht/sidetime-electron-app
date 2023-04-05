export type MembershipType = {
  id: number;
  name: string;
  site: SiteType;
}

export type UserType = {
  id: string;
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

export type ExpertType = {
  id: number;
  name: string;
  avatarUrl: string;
};

export type RequesterType = {
  id: number;
  name: string;
  avatarUrl: string;
};

export type MessageType = {
  user_id: number;
  body: string;
  created_at: string;
};

export type CommentType = MessageType & {
  id: number;
};

export type CallRequestType = {
  id: number;
  requester: RequesterType;
  expert: ExpertType;
  call_type: string;
  calls_count: number;
  charges_count: number;
  comments: CommentType[];
  comments_count: number;
  created_at: string;
  credit_cents: number;
  duration_in_mins: number;
  extra_time_in_mins: number;
  from_bundle: boolean;
  messaging_enabled: boolean;
  message: MessageType;
  minutes_used: number;
  missed_call_request_id: number | null;
  premium_fee_cents: number;
  price_cents: number;
  total_cost_cents: number;
  discount: {
    code: string;
    percentage_points: number;
  };
  proposed_times: string[];
  scheduled_at: string;
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
    | "paused";
  updated_at: string;
  videoconference: boolean;
  my_role: "requester" | "expert";
};

export type TokenType = {
  token: string;
};
