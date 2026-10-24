"use client";

import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Input } from "@workspace/ui/components/input";
import { Filter, Search, X } from "lucide-react";
import {
  STATUS_ORDER,
  type StatusFilter,
  StatusIcon,
  statusConfig,
} from "./status-config";

interface AssignmentsFiltersProps {
  onSearchChange: (query: string) => void;
  onStatusFilterChange: (filter: StatusFilter) => void;
  searchQuery: string;
  statusFilter: StatusFilter;
}

export function AssignmentsFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: AssignmentsFiltersProps) {
  return (
    <div className="flex gap-4">
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          aria-label="Buscar trabalhos"
          className="pr-9 pl-9"
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por trabalho, matéria ou turma…"
          value={searchQuery}
        />
        {searchQuery && (
          <button
            aria-label="Limpar busca"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => onSearchChange("")}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="gap-2" variant="outline">
            <Filter className="h-4 w-4" />
            {statusFilter === "all"
              ? "Todos"
              : statusConfig[statusFilter].label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onStatusFilterChange("all")}>
            Todos os trabalhos
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {STATUS_ORDER.map((status) => (
            <DropdownMenuItem
              key={status}
              onClick={() => onStatusFilterChange(status)}
            >
              <StatusIcon className="mr-2 h-4 w-4" status={status} />
              {statusConfig[status].label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
