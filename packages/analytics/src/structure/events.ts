export const EVENTS = {
  user_created: "user_created",
  user_pageview: "user_pageview",
  assignments_synced: "assignments_synced",
  assignment_submitted: "assignment_submitted",
  expected_error: "expected_error",
} as const;

export type Event = (typeof EVENTS)[keyof typeof EVENTS];
