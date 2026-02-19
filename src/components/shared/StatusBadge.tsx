import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { getStatusColor } from "@/lib/utils";

interface StatusBadgeProps {
    status: string;
    className?: string;
}

const statusLabels: Record<string, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    in_progress: "In Progress",
    completed: "Completed",
    cancelled: "Cancelled",
    online: "Online",
    offline: "Offline",
    busy: "Busy",
    paid: "Paid",
    refunded: "Refunded",
    escrow: "In Escrow",
    approved: "Approved",
    rejected: "Rejected",
    held: "Held",
    released: "Released",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const color = getStatusColor(status);
    const label = statusLabels[status] || status;
    const isLive = status === "online" || status === "in_progress";

    return (
        <Badge
            variant={color as "primary" | "success" | "warning" | "danger" | "info" | "default"}
            dot={isLive}
            pulse={isLive}
            className={className}
        >
            {label}
        </Badge>
    );
}

export function EmptyState({
    title = "No data found",
    description = "There are no items to display.",
    icon,
    action,
    className,
}: {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center py-12 px-4 text-center",
                className
            )}
        >
            {icon && (
                <div className="w-12 h-12 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center mb-4 text-[var(--text-tertiary)]">
                    {icon}
                </div>
            )}
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                {title}
            </h3>
            <p className="text-xs text-[var(--text-tertiary)] max-w-xs mb-4">
                {description}
            </p>
            {action}
        </div>
    );
}

export function LivePulse({ className }: { className?: string }) {
    return (
        <span className={cn("relative flex h-2.5 w-2.5", className)}>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success-500" />
        </span>
    );
}

export function PageHeader({
    title,
    subtitle,
    action,
    className,
}: {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6",
                className
            )}
        >
            <div>
                <h1 className="text-xl font-bold text-[var(--text-primary)]">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                        {subtitle}
                    </p>
                )}
            </div>
            {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
    );
}
