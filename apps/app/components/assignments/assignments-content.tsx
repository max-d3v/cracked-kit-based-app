"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { orpc } from "@workspace/data-layer/orpc.tanstack";
import { useEffect, useMemo, useState } from "react";
import { AssignmentsFilters } from "./assignments-filters";
import { AssignmentsStats } from "./assignments-stats";
import { AssignmentsTable } from "./assignments-table";
import { useAssignmentsContext } from "./context";
import type { StatusFilter } from "./status-config";

export function AssignmentsContent() {
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setTotalPages,
    setSelectedAssignment,
  } = useAssignmentsContext();

  const { data } = useSuspenseQuery(orpc.assignments.list.queryOptions());

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const { assignments, counts } = data;

  const filteredAssignments = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return assignments.filter((assignment) => {
      if (statusFilter !== "all" && assignment.status !== statusFilter) {
        return false;
      }
      if (!query) {
        return true;
      }
      return [assignment.title, assignment.subject, assignment.classroom].some(
        (field) => field.toLowerCase().includes(query)
      );
    });
  }, [assignments, statusFilter, searchQuery]);

  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAssignments = filteredAssignments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setTotalPages(totalPages);
  }, [totalPages, setTotalPages]);

  return (
    <>
      <AssignmentsStats counts={counts} />

      <AssignmentsFilters
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        onStatusFilterChange={(f) => {
          setStatusFilter(f);
          setCurrentPage(1);
        }}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
      />

      <AssignmentsTable
        assignments={paginatedAssignments}
        onSelect={setSelectedAssignment}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        total={filteredAssignments.length}
      />
    </>
  );
}
