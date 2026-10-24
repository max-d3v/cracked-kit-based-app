import assignmentsRouter from "./routers/assignments";
import billingRouter from "./routers/billing";
import usersRouter from "./routers/users";

export const router = {
  assignments: assignmentsRouter,
  billing: billingRouter,
  users: usersRouter,
};
