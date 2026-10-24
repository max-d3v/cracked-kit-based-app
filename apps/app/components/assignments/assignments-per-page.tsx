"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { useAssignmentsContext } from "./context";

export function AssignmentsPerPage() {
  const { itemsPerPage, setItemsPerPage } = useAssignmentsContext();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-muted-foreground text-sm">Mostrar</span>
      <Select
        onValueChange={(value) => setItemsPerPage(Number(value))}
        value={itemsPerPage.toString()}
      >
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>
      <span className="text-muted-foreground text-sm">por página</span>
    </div>
  );
}
