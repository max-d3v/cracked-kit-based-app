"use client";

import { createContext, useContext, useState } from "react";

interface AssignmentsContextValue {
  currentPage: number;
  itemsPerPage: number;
  selectedAssignmentId: string | null;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (n: number) => void;
  setSelectedAssignmentId: (id: string | null) => void;
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
  // Only the id: the sheet reads the live row from the list query so it
  // reflects mutations and polling.
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<
    string | null
  >(null);
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
        selectedAssignmentId,
        setSelectedAssignmentId,
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
