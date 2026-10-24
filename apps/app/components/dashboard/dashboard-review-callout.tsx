"use client";

import { getOrganizationSlug } from "@workspace/auth/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Eye } from "lucide-react";
import Link from "next/link";

export function DashboardReviewCallout({ count }: { count: number }) {
  const organizationSlug = getOrganizationSlug();

  if (count === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
      <div className="flex items-center gap-3">
        <Eye className="h-5 w-5 text-amber-500" />
        <p className="text-sm">
          <span className="font-semibold">
            {count === 1 ? "1 trabalho pronto" : `${count} trabalhos prontos`}
          </span>{" "}
          esperando sua aprovação para serem enviados no Teams.
        </p>
      </div>
      <Button asChild size="sm" variant="outline">
        <Link href={`/${organizationSlug}/dashboard/trabalhos`}>Revisar</Link>
      </Button>
    </div>
  );
}
