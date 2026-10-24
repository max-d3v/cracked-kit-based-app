"use client";

import type { Assignment } from "@workspace/types/use-cases/assignments";
import { createContext, useContext, useState } from "react";

interface AssignmentsContextValue {
  currentPage: number;
  itemsPerPage: number;
  selectedAssignment: Assignment | null;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (n: number) => void;
  setSelectedAssignment: (assignment: Assignment | null) => void;
  setTotalPages: (pages: number) => void;
  totalPages: number;
}

const AssignmentsContext = createContext<AssignmentsContextValue | null>(null);

export function useAssignmentsContext() {
  const context = useContext(AssignmentsContext);
  if (!context) {
    throw new Error(
      "useAssignmentsContext must be used within an AssignmentsProvider"
    );
  }
  return context;
}

export function AssignmentsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPageRaw] = useState(10);

  const setItemsPerPage = (n: number) => {
    setItemsPerPageRaw(n);
    setCurrentPage(1);
  };

  return (
    <AssignmentsContext.Provider
      value={{
        selectedAssignment,
        setSelectedAssignment,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        itemsPerPage,
        setItemsPerPage,
      }}
    >
      {children}
    </AssignmentsContext.Provider>
  );
}
