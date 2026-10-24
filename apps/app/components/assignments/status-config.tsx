import type { Assignment } from "@workspace/types/use-cases/assignments";
import { cn } from "@workspace/ui/lib/utils";
import {
  AlertTriangle,
  CheckCircle2,
  Eye,
  GraduationCap,
  Loader2,
  ScanSearch,
} from "lucide-react";

export type AssignmentStatus = Assignment["status"];
export type StatusFilter = AssignmentStatus | "all";

type StatusConfig = {
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  badgeClassName: string;
  spin?: boolean;
};

export const statusConfig = {
  found: {
    label: "Na fila",
    description: "Encontrado no Teams, aguardando resolução",
    icon: ScanSearch,
    color: "text-muted-foreground",
    badgeClassName: "border-border bg-muted text-muted-foreground",
  },
  solving: {
    label: "Resolvendo",
    description: "A IA está resolvendo este trabalho",
    icon: Loader2,
    color: "text-blue-500",
    badgeClassName:
      "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    spin: true,
  },
  review: {
    label: "Para revisar",
    description: "Pronto — aprove para enviar no Teams",
    icon: Eye,
    color: "text-amber-500",
    badgeClassName:
      "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  submitted: {
    label: "Entregue",
    description: "Enviado no Teams em seu nome",
    icon: CheckCircle2,
    color: "text-emerald-500",
    badgeClassName:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  graded: {
    label: "Corrigido",
    description: "O professor já deu a nota",
    icon: GraduationCap,
    color: "text-violet-500",
    badgeClassName:
      "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  failed: {
    label: "Precisa de você",
    description: "Não conseguimos resolver sozinhos",
    icon: AlertTriangle,
    color: "text-red-500",
    badgeClassName:
      "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
  },
} satisfies Record<AssignmentStatus, StatusConfig>;

export const STATUS_ORDER: AssignmentStatus[] = [
  "found",
  "solving",
  "review",
  "submitted",
  "graded",
  "failed",
];

export const StatusIcon = ({
  status,
  className,
}: {
  status: AssignmentStatus;
  className?: string;
}) => {
  const config: StatusConfig = statusConfig[status];
  const Icon = config.icon;
  return (
    <Icon
      className={cn(
        "h-5 w-5",
        config.color,
        config.spin && "animate-spin",
        className
      )}
    />
  );
};

export const StatusBadge = ({ status }: { status: AssignmentStatus }) => (
  <span
    className={cn(
      "inline-flex items-center whitespace-nowrap rounded-md border px-2 py-0.5 font-medium text-xs",
      statusConfig[status].badgeClassName
    )}
  >
    {statusConfig[status].label}
  </span>
);

export const ProgressBar = ({ value }: { value: number }) => (
  <div className="flex items-center gap-2">
    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full bg-blue-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
    <span className="text-muted-foreground text-xs tabular-nums">{value}%</span>
  </div>
);
