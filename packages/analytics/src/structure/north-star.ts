import { EVENTS } from "./events";
export const NORTH_STAR_METRICS = {
  assignment_submitted: {
    events: [
      EVENTS.user_created,
      EVENTS.assignments_synced,
      EVENTS.assignment_submitted,
    ],
  },
};
