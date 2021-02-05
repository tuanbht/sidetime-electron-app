export type UserType = {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  location: string;
  timezone: string;
  headline: string;
  organization: string;
  bio: string;
  token: string;
  expert_profile:
    | {
        id: string;
        slug: string;
        status: string;
        flexible_schedule: boolean;
        tags: string[];
        keywords: string[];
        years_of_experience: number;
        price_cents: number;
        minimum_time_in_minutes: number;
        profile_visibility: string;
        featured: boolean;
        known_for: string;
        approved_at: null;
      }
    | undefined;
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
  status:
    | "live"
    | "pending_expert_acceptance"
    | "pending_requester"
    | "scheduled"
    | "completed"
    | "declined"
    | "canceled";
  updated_at: string;
  videoconference: boolean;
  my_role: "requester" | "expert";
};

export type TokenType = {
  token: string;
};
