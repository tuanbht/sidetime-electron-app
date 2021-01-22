export type UserType = {
  token: string;
};

export type SiteType = {
  id: number;
  name: string;
};

export type ExpertType = {
  id: number;
  name: string;
};

export type RequesterType = {
  id: number;
  name: string;
};

export type CallRequestType = {
  id: number;
  requester: RequesterType;
  expert: ExpertType;
  call_type: string;
  calls_count: number;
  charges_count: number;
  comments_count: number;
  created_at: string;
  credit_cents: number;
  duration_in_mins: number;
  extra_time_in_mins: number;
  message: string;
  minutes_used: number;
  missed_call_request_id: number | null;
  premium_fee_cents: number;
  price_cents: number;
  proposed_times: string[];
  scheduled_at: string;
  site: SiteType;
  slug: string;
  status: string;
  updated_at: string;
  videoconference: boolean;
  my_role: "requester" | "expert";
};
