import type { AssignmentCounts } from "@workspace/types/use-cases/assignments";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { AlertTriangle, CheckCircle2, Eye, Loader2 } from "lucide-react";

const STATS = [
  {
    key: "pending",
    label: "Na fila / resolvendo",
    icon: Loader2,
    color: "text-blue-500",
  },
  {
    key: "review",
    label: "Para revisar",
    icon: Eye,
    color: "text-amber-500",
  },
  {
    key: "submitted",
    label: "Entregues",
    icon: CheckCircle2,
    color: "text-emerald-500",
  },
  {
    key: "failed",
    label: "Precisam de você",
    icon: AlertTriangle,
    color: "text-red-500",
  },
] as const satisfies {
  key: keyof AssignmentCounts;
  label: string;
  icon: React.ElementType;
  color: string;
}[];

export function AssignmentsStats({ counts }: { counts: AssignmentCounts }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.key}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-medium text-muted-foreground text-sm">
                <Icon className={`h-4 w-4 ${stat.color}`} />
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`font-bold text-3xl ${stat.color}`}>
                {counts[stat.key]}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
