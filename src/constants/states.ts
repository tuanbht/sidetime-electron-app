/**
 * Call request states
 * */

export const CALL_REQUEST_LIVE = "live";
export const CALL_REQUEST_PENDING_EXPERT = "pending_expert_acceptance";
export const CALL_REQUEST_PENDING_REQUESTER = "pending_requester";
export const CALL_REQUEST_SCHEDULED = "scheduled";
export const CALL_REQUEST_COMPLETED = "completed";
export const CALL_REQUEST_CANCELED = "canceled";
export const CALL_REQUEST_DECLINED = "declined";
export const CALL_REQUEST_PAUSED = "paused";
export const CALL_REQUEST_EXTENDED = "extended";
export const CALL_REQUEST_INCOMPLETE = "incomplete";
export const CALL_REQUEST_PENDING_CONNECTION = "pending_connection";
export const CALL_REQUEST_MISSED = "missed";

export const EXPERT_CALLED = 'expert_called';
export const EXPERT_UNCALLED = 'expert_uncalled';
export const EXPERT_BUSY = 'expert_busy';
export const EXPERT_FAILED = 'expert_failed';
export const EXPERT_NO_ANSWER = 'expert_no_answer';
export const EXPERT_CANCELED = 'expert_canceled';
export const EXPERT_CONNECTED = 'expert_connected';
export const EXPERT_COMPLETED = 'expert_completed';

export const CALL_REQUEST_PENDING = [CALL_REQUEST_PENDING_EXPERT, CALL_REQUEST_PENDING_REQUESTER];
export const CALL_REQUEST_FINISHABLE = [CALL_REQUEST_LIVE, CALL_REQUEST_PAUSED, CALL_REQUEST_EXTENDED, CALL_REQUEST_INCOMPLETE];
export const CALL_REQUEST_IN_PROGRESS = [CALL_REQUEST_LIVE, CALL_REQUEST_PAUSED, CALL_REQUEST_EXTENDED, CALL_REQUEST_PENDING_CONNECTION];
