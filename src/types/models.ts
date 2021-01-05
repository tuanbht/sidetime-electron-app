export type Site = {
  id: number;
  name: string;
};

export type Expert = {
  id: number;
  name: string;
};

export type Requester = {
  id: number;
  name: string;
};

export type CallRequest = {
  id: number;
  requester: Requester;
  expert: Expert;
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
  site: Site;
  slug: string;
  status: string;
  updated_at: string;
  videoconference: boolean;
  my_role: "requester" | "expert";
};
