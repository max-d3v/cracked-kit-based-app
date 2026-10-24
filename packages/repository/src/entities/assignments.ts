import type { SQL, SQLWrapper } from "@workspace/database/client";
import { and, asc, db, eq, ilike, or } from "@workspace/database/client";
import { assignment } from "@workspace/database/schema";
import { HttpError } from "@workspace/types/errors/http";
import type {
  AssignmentRawObject,
  CreateAssignmentParams,
  DeleteAssignmentParams,
  GetAssignmentParams,
  ListAssignmentsParams,
  UpdateAssignmentParams,
  WhereClauseParams,
} from "@workspace/types/repository/assignments";

const DEFAULT_PAGE_SIZE = 100;
const DEFAULT_PAGE_NUM = 1;

const buildSearchClause = (search?: string) => {
  if (!search) {
    return undefined;
  }
  return or(
    ilike(assignment.title, `%${search}%`),
    ilike(assignment.subject, `%${search}%`),
    ilike(assignment.classroom, `%${search}%`)
  );
};

const buildWhereClause = (params: WhereClauseParams): SQL | undefined => {
  const { search, userId } = params;

  const whereClause: SQLWrapper[] = [eq(assignment.userId, userId)];
  const searchClause = buildSearchClause(search);
  if (searchClause) {
    whereClause.push(searchClause);
  }

  return and(...whereClause);
};

export const list = async (
  params: ListAssignmentsParams
): Promise<AssignmentRawObject[]> => {
  const {
    search,
    pageNum = DEFAULT_PAGE_NUM,
    pageSize = DEFAULT_PAGE_SIZE,
    userId,
  } = params;

  const offset = (pageNum - 1) * pageSize;

  return await db.query.assignment.findMany({
    where: buildWhereClause({ search, userId }),
    orderBy: asc(assignment.dueDate),
    limit: pageSize,
    offset,
  });
};

export const get = async (
  params: GetAssignmentParams
): Promise<AssignmentRawObject> => {
  const { id, userId } = params;

  const found = await db.query.assignment.findFirst({
    where: and(eq(assignment.id, id), eq(assignment.userId, userId)),
  });

  if (!found) {
    throw new HttpError(404, "Assignment not found");
  }

  return found;
};

export const createMany = async (
  params: CreateAssignmentParams[]
): Promise<AssignmentRawObject[]> => {
  if (params.length === 0) {
    return [];
  }
  return await db.insert(assignment).values(params).returning();
};

export const updateOne = async (
  params: UpdateAssignmentParams
): Promise<AssignmentRawObject> => {
  const { id, userId, ...data } = params;

  const result = await db
    .update(assignment)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(assignment.id, id), eq(assignment.userId, userId)))
    .returning();

  const updated = result[0];
  if (!updated) {
    throw new HttpError(404, "Assignment not found");
  }

  return updated;
};

export const deleteOne = async (
  params: DeleteAssignmentParams
): Promise<AssignmentRawObject> => {
  const { id, userId } = params;

  const result = await db
    .delete(assignment)
    .where(and(eq(assignment.id, id), eq(assignment.userId, userId)))
    .returning();

  const deleted = result[0];
  if (!deleted) {
    throw new HttpError(404, "Assignment not found");
  }

  return deleted;
};

export const deleteAllByUserId = async (params: {
  userId: string;
}): Promise<void> => {
  const { userId } = params;
  await db.delete(assignment).where(eq(assignment.userId, userId));
};
